import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideTransloco, translocoConfig, TranslocoLoader } from '@ngneat/transloco';
import { of } from 'rxjs';
import { initialAppState } from './state/app.reducer';
import { App } from './app';

describe('App', () => {
  class TestTranslocoLoader implements TranslocoLoader {
    getTranslation() {
      return of({
        app: {
          footer: {
            title: 'Question Trainer',
          },
        },
      });
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideMockStore({ initialState: { app: initialAppState } }),
        provideTransloco({
          config: translocoConfig({
            availableLangs: ['en', 'nl'],
            defaultLang: 'en',
            reRenderOnLangChange: true,
            prodMode: true,
          }),
          loader: TestTranslocoLoader,
        }),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render footer branding', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('footer')?.textContent).toContain('Question Trainer');
  });
});
