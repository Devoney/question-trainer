import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { AnswerCheckerService } from '../../services/answer-checker.service';
import { PhotoQaIngestionService } from '../../services/photo-qa-ingestion.service';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule, TranslocoModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings implements OnInit {
  private readonly answerChecker = inject(AnswerCheckerService);
  private readonly photoIngestion = inject(PhotoQaIngestionService);

  baseEndpoint = '';
  ocrEndpoint = '';
  aiGradingModel = '';
  qaModel = '';
  ocrModel = '';

  ngOnInit(): void {
    this.baseEndpoint = this.answerChecker.getOllamaUrl();
    this.ocrEndpoint = this.photoIngestion.getStoredOcrOllamaUrl();
    this.aiGradingModel = this.answerChecker.getModel();
    this.qaModel = this.photoIngestion.getQaModel();
    this.ocrModel = this.photoIngestion.getOcrModel();
  }

  updateBaseEndpoint(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    const value = target?.value?.trim() ?? '';
    const endpoint = value || this.answerChecker.getDefaultOllamaUrl();
    this.baseEndpoint = endpoint;
    this.answerChecker.setOllamaUrl(endpoint);
    this.photoIngestion.setQaOllamaUrl(endpoint);
  }

  updateOcrEndpoint(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    const value = target?.value?.trim() ?? '';
    this.ocrEndpoint = value;
    this.photoIngestion.setOcrOllamaUrl(value);
  }

  updateAiGradingModel(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    const value = target?.value?.trim() ?? '';
    const model = value || this.answerChecker.getDefaultModel();
    this.aiGradingModel = model;
    this.answerChecker.setModel(model);
  }

  updateQaModel(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    const value = target?.value?.trim() ?? '';
    const model = value || this.photoIngestion.getDefaultQaModel();
    this.qaModel = model;
    this.photoIngestion.setQaModel(model);
  }

  updateOcrModel(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    const value = target?.value?.trim() ?? '';
    const model = value || this.photoIngestion.getDefaultOcrModel();
    this.ocrModel = model;
    this.photoIngestion.setOcrModel(model);
  }
}
