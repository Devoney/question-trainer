# Plan: AI-assisted rehearsal (Angular)

## Goal
Add an AI-assisted mode for question rehearsal that checks the user’s answer via a local Ollama endpoint (XHR, non‑streaming), while preserving the existing manual mode. When AI mode is enabled:
- The user cannot reveal the expected answer via “show answer.”
- The “show answer” UI becomes a “Check answer” action.
- The app calls local Ollama to judge correctness.
- If the answer is incorrect, it counts as wrong, shows the expected answer, and the user must click a “Continue” button to proceed.
- If correct, it counts as correct and proceeds similarly.

## Affected components and files
- Angular/src/app/components/question-list/question-trainer/question-trainer.ts
- Angular/src/app/components/question-list/question-trainer/question-trainer.html
- Angular/src/app/components/question-list/question-trainer/question-trainer.css (for new UI states/spinner)
- Angular/src/app/services (new) answer-checker service
- Angular/src/app/state (optional) if AI toggle should be global

## UX flow (detailed)
### Manual mode (default, AI OFF)
- Current flow remains unchanged:
  - User answers in editor.
  - Clicks “show answer.”
  - Clicks “Wrong” or “Correct.”

### AI mode (AI ON)
1. **Toggle AI mode ON**
   - Toggle should be visible in Question Trainer header, near the repeat toggle.
   - Label: “Use AI grading” (or similar).
   - Default: OFF, persisted per session (optional localStorage).

2. **User inputs answer**
   - CKEditor remains enabled for typing.
   - “Show answer” banner is replaced with a “Check answer” button/banner.

3. **User clicks “Check answer”**
   - Disable editor and action buttons while request is in progress.
   - Display a small “Checking…” indicator.
   - Send XHR (HttpClient) request to local Ollama.

4. **AI response handling**
   - If AI says **correct**:
     - Increment correct count (same as current `answerIsCorrect()` path).
     - Mark question as answered and show “Correct” feedback.
     - Show a “Continue” button to move to next question.
   - If AI says **incorrect**:
     - Increment wrong count (same as current `answerIsWrong()` path).
     - Reveal expected answer.
     - Display the AI’s reasoning/feedback so the user understands why it was rejected.
     - Show a “Continue” button to move to next question.

5. **Continue**
   - User clicks “Continue” to move to next question (same as `setNextQuestion()` flow).

## Network contract (Ollama)
- Endpoint: http://localhost:11434/api/generate (non‑streaming)
- Payload example:
  - `model`: a configurable model name (e.g., `llama3.1`), stored in component or environment.
  - `prompt`: a structured prompt that includes the question, expected answer, and user answer.
  - `stream`: false
- Response expectations:
  - Prefer JSON output with a minimal schema, e.g. `{ "correct": true|false, "reason": "..." }`.
  - If Ollama returns plain text, parse for a strict `correct` boolean.

## Prompt construction and sanitization
- Convert HTML from CKEditor (`questionHtml`, `answerHtml`, `answerGiven`) into plain text before sending to Ollama.
  - Strip tags and decode entities to avoid leaking markup into the prompt.
  - Keep the prompt short and structured, e.g.:
    - “Question: …”
    - “Expected answer: …”
    - “User answer: …”
- Require the model to respond with JSON only to simplify parsing.

## Component-level changes (question-trainer)
### New state in question-trainer.ts
- `useAiGrading: boolean` (toggle state)
- `aiCheckInProgress: boolean`
- `aiCheckResult?: { correct: boolean; reason?: string }`
- `aiFeedbackMessage: string` (optional)
- `aiNeedsContinue: boolean` (controls showing Continue button)

### New methods in question-trainer.ts
- `toggleAiGrading()`
  - Updates `useAiGrading` and resets AI-related UI state.
- `checkAnswerWithAi()`
  - Guards: only when `hasQuestion` and answer input is not empty.
  - Sets `aiCheckInProgress = true`.
  - Calls `AnswerCheckerService.checkAnswer(...)`.
  - Applies result: if correct → count correct; if incorrect → count wrong + reveal answer.
  - Sets `aiNeedsContinue = true`.
- `continueAfterAiCheck()`
  - Resets AI UI state (`aiNeedsContinue`, `aiCheckResult`, `showAnswer`, etc.).
  - Calls `setNextQuestion()`.

### Reuse existing logic
- Keep `answerIsCorrect()` and `answerIsWrong()` for manual mode.
- For AI mode, re‑use the same internal counting logic by calling `incrementCorrectCount()` / `incrementWrongCount()` and `setNextQuestion()` at the right time.

## Template changes (question-trainer.html)
### Header
- Add a toggle UI in the header row (next to repeat mode icon), e.g.:
  - A checkbox or switch labeled “Use AI grading”.
  - Bind to `useAiGrading` and `toggleAiGrading()`.

### Answer section
- When AI mode OFF:
  - Keep existing “Click here to show the answer” banner.
- When AI mode ON:
  - Replace the show‑answer banner with a “Check answer” button/banner.
  - Disable it if no question or answer input is empty.
  - Show an inline spinner or “Checking…” text while `aiCheckInProgress` is true.

### Footer buttons
- When AI mode OFF:
  - Keep “Wrong” and “Correct” buttons enabled only when answer is shown.
- When AI mode ON:
  - Hide/disable “Wrong” and “Correct” buttons.
  - Show a single “Continue” button after AI check result (`aiNeedsContinue`).
  - Keep `Continue` disabled until AI check has completed.

## New service: AnswerCheckerService
### Location
- Angular/src/app/services/answer-checker.service.ts

### Responsibilities
- Build request payload.
- Send non‑streaming XHR via Angular `HttpClient`.
- Parse response into `{ correct: boolean; reason?: string }`.
- Handle errors with a safe fallback (treat as incorrect and show a message).

### Interface (example)
- `checkAnswer(questionHtml: string, expectedHtml: string, userAnswerHtml: string): Observable<AiCheckResult>`

## State considerations
- **Local-only** toggle is simplest and avoids global app changes.
- Optional: store `useAiGrading` in NgRx state if it should persist across app sections.

## Error handling and edge cases
- If Ollama is unreachable:
  - Show a short error message under the “Check answer” button.
  - Treat as incorrect or allow manual fallback (design choice). Recommended: allow user to retry.
- If response is malformed:
  - Default to incorrect and show a short error message.
- If answer is empty:
  - Disable “Check answer”.

## Acceptance checklist
- Manual mode unchanged.
- AI mode uses “Check answer” and never reveals answer before check.
- “Wrong/Correct” manual buttons are disabled/hidden in AI mode.
- “Continue” appears only after AI check completes.
- Non‑streaming XHR call to local Ollama is made with expected payload.
- Errors are handled gracefully without crashing the UI.
