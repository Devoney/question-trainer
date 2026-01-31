import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideTransloco, translocoConfig } from '@ngneat/transloco';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { appReducer } from './state/app.reducer';
import { AppEffects } from './state/app.effects';
import { TranslocoHttpLoader } from './transloco-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({ app: appReducer }),
    provideEffects(AppEffects),
    provideHttpClient(),
    provideTransloco({
      config: translocoConfig({
        availableLangs: ['en', 'nl'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: false
      }),
      loader: TranslocoHttpLoader
    })
]
};
