import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { of } from 'rxjs';
import { catchError, finalize, take } from 'rxjs/operators';
import { AnswerCheckerService } from '../../services/answer-checker.service';
import { PhotoQaIngestionService } from '../../services/photo-qa-ingestion.service';
import { OllamaModelsService } from '../../services/ollama-models.service';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule, TranslocoModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings implements OnInit {
  private readonly answerChecker = inject(AnswerCheckerService);
  private readonly photoIngestion = inject(PhotoQaIngestionService);
  private readonly ollamaModels = inject(OllamaModelsService);

  baseEndpoint = '';
  ocrEndpoint = '';
  aiGradingModel = '';
  qaModel = '';
  ocrModel = '';
  availableModels: string[] = [];
  modelsLoading = false;
  modelsError = false;

  ngOnInit(): void {
    this.baseEndpoint = this.answerChecker.getOllamaUrl();
    this.ocrEndpoint = this.photoIngestion.getStoredOcrOllamaUrl();
    this.aiGradingModel = this.answerChecker.getModel();
    this.qaModel = this.photoIngestion.getQaModel();
    this.ocrModel = this.photoIngestion.getOcrModel();
    this.loadModels();
  }

  updateBaseEndpoint(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    const value = target?.value?.trim() ?? '';
    const endpoint = value || this.answerChecker.getDefaultOllamaUrl();
    this.baseEndpoint = endpoint;
    this.answerChecker.setOllamaUrl(endpoint);
    this.photoIngestion.setQaOllamaUrl(endpoint);
    this.loadModels();
  }

  updateOcrEndpoint(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    const value = target?.value?.trim() ?? '';
    this.ocrEndpoint = value;
    this.photoIngestion.setOcrOllamaUrl(value);
  }

  updateAiGradingModel(model: string): void {
    const value = model?.trim() || this.answerChecker.getDefaultModel();
    this.aiGradingModel = value;
    this.answerChecker.setModel(value);
  }

  updateQaModel(model: string): void {
    const value = model?.trim() || this.photoIngestion.getDefaultQaModel();
    this.qaModel = value;
    this.photoIngestion.setQaModel(value);
  }

  updateOcrModel(model: string): void {
    const value = model?.trim() || this.photoIngestion.getDefaultOcrModel();
    this.ocrModel = value;
    this.photoIngestion.setOcrModel(value);
  }

  private loadModels(): void {
    this.modelsLoading = true;
    this.modelsError = false;
    this.availableModels = [];

    this.ollamaModels
      .getModels(this.baseEndpoint)
      .pipe(
        take(1),
        catchError(() => {
          this.modelsError = true;
          return of([] as string[]);
        }),
        finalize(() => {
          this.modelsLoading = false;
        })
      )
      .subscribe((models) => {
        this.availableModels = models;
        if (this.availableModels.length === 0) {
          return;
        }

        if (!this.availableModels.includes(this.aiGradingModel)) {
          this.updateAiGradingModel(this.availableModels[0]);
        }
        if (!this.availableModels.includes(this.qaModel)) {
          this.updateQaModel(this.availableModels[0]);
        }
        if (!this.availableModels.includes(this.ocrModel)) {
          this.updateOcrModel(this.availableModels[0]);
        }
      });
  }
}
