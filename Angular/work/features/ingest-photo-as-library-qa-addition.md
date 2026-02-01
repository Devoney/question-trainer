# Ingest photo as new Question & Answer set.

The user wants to be able to quickly turn school books into Q&A in this question trainer. Therefore the users wants to be able to upload a photo, choose a book and chapter, and get Q&A from the AI in return. The application should receive this Q&A response and add it to the library. It should be possible to repeat this process sequentially for the same chapter. if the optional book page number is provided it should be added too. For this process the same ollama endpoint will be used. However, the model differs from the model that checks whether the users answer is correct. See the answer check service for how ollama is used now.

## Product plan

### Goals
- Turn a single photo of a textbook page into multiple Q&A items that can be added to an existing book/chapter.
- Keep the flow fast: upload → pick book/chapter → review → add.
- Support repeated ingestion for the same chapter without reselecting it each time.

### User flow
1. Open “Ingest photo” from the library UI.
2. Select a book and chapter (preselect last used if available).
3. Upload a photo (JPG/PNG) and optionally enter a page number.
4. Send the photo to the AI model and wait for extraction.
5. Review the proposed Q&A list (not yet added to the library).
6. Remove any Q&A item that should not be added.
7. Confirm to add the remaining items to the chapter (append to existing questions).
8. Optionally ingest another photo for the same chapter.

### UX requirements
- Provide a clear call-to-action in the library view.
- Display upload progress and model processing state.
- Show validation errors (unsupported file type, missing selection, empty AI response).
- Make it explicit that generated Q&A is a preview only until the user confirms add.
- Allow easy removal of any generated Q&A item.
- Maintain last selected book/chapter for repeat ingestion.

### Data requirements
- Generated questions must conform to the existing `Question` shape: `id`, `question`, `answer`, `pageNr` (optional, but stored when provided).
- If a page number is provided by the user, attach it to each generated question.
- Preserve HTML formatting if returned (same as existing `question`/`answer` fields).

### Non-functional requirements
- Handle large images gracefully (client-side size limit or compression warning).
- Keep prompt/response parsing robust against partial or noisy OCR output.
- Provide retry on failed ingestion without losing user edits.

### Edge cases
- The photo contains multiple pages or non-text: AI returns empty list → show a “no questions found” state.
- The AI returns malformed JSON: show parsing error and allow retry.
- Duplicates: allow user to remove duplicates before saving.

## Technical plan

### API & AI integration
- Reuse the existing Ollama endpoint configuration, but use a new model name dedicated to Q&A extraction.
- Define a strict response contract: JSON array of objects with `question`, `answer`, optional `pageNr`.
- Prompt should instruct the model to return only JSON and avoid markdown.

### Frontend changes
- Add a new UI entry point in the library area (button or menu item).
- Create a new component (e.g., `ingest-photo`) with:
	- File input and preview.
	- Book and chapter selectors (reuse existing book/chapter pickers).
	- Optional page number input.
	- Results list with remove-only actions per Q&A item.
	- Confirm action to append questions to the selected chapter (after preview).
- Store the last selected book/chapter in state for repeat ingestion.

### State management
- Extend `AppState` with a transient ingestion state (selected book/chapter, file, results, loading/error flags).
- Add actions for: start ingestion, ingestion success, ingestion error, remove generated question, accept results.
- Ensure persisted state excludes the transient ingestion fields.

### Validation & parsing
- Build a parser that validates AI output against the expected Q&A schema.
- If a page number is entered by the user, apply it to each returned item when missing.
- Generate new `id` values for each created question before adding to the chapter.

### File handling
- Limit file types to JPG/PNG and a max size threshold.
- Convert image to base64 or `FormData` depending on Ollama endpoint requirements.

### Testing
- Unit test parser and validation behavior with:
	- Valid JSON responses.
	- Malformed JSON.
	- Empty list.
	- Missing fields.
- Component tests for ingestion flow, editing, and confirm add.

### Rollout plan
- Implement behind a feature flag if needed.
- Start with a minimal prompt and iterate based on real photo results.