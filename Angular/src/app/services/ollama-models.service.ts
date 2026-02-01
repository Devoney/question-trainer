import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface OllamaTagResponse {
  models?: Array<{ name?: string }>;
}

@Injectable({ providedIn: 'root' })
export class OllamaModelsService {
  private readonly http = inject(HttpClient);

  getModels(baseUrl: string): Observable<string[]> {
    const tagsUrl = this.toTagsUrl(baseUrl);
    return this.http.get<OllamaTagResponse>(tagsUrl).pipe(
      map((response) =>
        (response.models ?? [])
          .map((model) => model.name ?? '')
          .filter((name) => !!name)
      )
    );
  }

  private toTagsUrl(baseUrl: string): string {
    try {
      const url = new URL(baseUrl);
      if (url.pathname.endsWith('/api/generate')) {
        url.pathname = url.pathname.replace(/\/api\/generate\/?$/, '/api/tags');
      } else if (url.pathname.endsWith('/api')) {
        url.pathname = url.pathname.replace(/\/api\/?$/, '/api/tags');
      } else {
        url.pathname = url.pathname.replace(/\/$/, '') + '/api/tags';
      }
      url.search = '';
      url.hash = '';
      return url.toString();
    } catch {
      return baseUrl.replace(/\/api\/generate\/?$/, '/api/tags');
    }
  }
}
