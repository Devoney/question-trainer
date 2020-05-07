import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterManagerComponent } from './chapter-manager.component';

describe('ChapterManagerComponent', () => {
  let component: ChapterManagerComponent;
  let fixture: ComponentFixture<ChapterManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
