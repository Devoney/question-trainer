import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { I18nContainerComponent } from './i18n-container.component';

describe('I18nContainerComponent', () => {
  let component: I18nContainerComponent;
  let fixture: ComponentFixture<I18nContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ I18nContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(I18nContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
