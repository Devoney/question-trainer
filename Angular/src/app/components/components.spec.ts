import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { initialAppState } from '../state/app.reducer';
import { MessageBusService } from '../services/message-bus.service';
import { QuestionModalArgs } from '../types/question-modal-args';
import { Book } from '../models/book';
import { Chapter } from '../models/chapter';
import { Question } from '../models/question';
import { clearQuestionList, removeFromQuestionList, setEditedBook } from '../state/app.actions';
import { registerFontAwesomeIcons } from '../font-awesome';
import { AddOrRemove } from './add-or-remove/add-or-remove';
import { AddBook } from './books/add-book/add-book';
import { BookManager } from './books/book-manager/book-manager';
import { BookRecord } from './books/book-record/book-record';
import { BookSelector } from './books/book-selector/book-selector';
import { BookTable } from './books/book-table/book-table';
import { EditBook } from './books/edit-book/edit-book';
import { AddChapter } from './chapters/add-chapter/add-chapter';
import { ChapterManager } from './chapters/chapter-manager/chapter-manager';
import { ChapterRecord } from './chapters/chapter-record/chapter-record';
import { ChapterSelector } from './chapters/chapter-selector/chapter-selector';
import { ChapterTable } from './chapters/chapter-table/chapter-table';
import { EditChapter } from './chapters/edit-chapter/edit-chapter';
import { ConfirmationModal } from './confirmation-modal/confirmation-modal';
import { IconButtonComponent } from './icon-button/icon-button';
import { ImportExport } from './import-export/import-export';
import { Library } from './library/library';
import { LibraryDetails } from './library/library-details/library-details';
import { MemoryUsage } from './library/memory-usage/memory-usage';
import { ClearButton } from './question-list/clear-button/clear-button';
import { QuestionList } from './question-list/question-list/question-list';
import { QuestionListRecord } from './question-list/question-list-record/question-list-record';
import { QuestionTrainer } from './question-list/question-trainer/question-trainer';
import { QuestionModal } from './question-modal/question-modal';
import { AddQuestion } from './questions/add-question/add-question';
import { QuestionManager } from './questions/question-manager/question-manager';
import { QuestionRecord } from './questions/question-record/question-record';
import { QuestionTable } from './questions/question-table/question-table';
import { TabPage } from './tab-page/tab-page';
import { Tabs } from './tabs/tabs';
import { ViewMode } from './view-mode/view-mode';
import { ViewModeItem } from './view-mode-item/view-mode-item';

const baseProviders = [
  provideMockStore({ initialState: { app: initialAppState } }),
  MessageBusService,
];

async function configure<T>(component: Type<T>): Promise<void> {
  await TestBed.configureTestingModule({
    imports: [component],
    providers: baseProviders,
  }).compileComponents();

  const library = TestBed.inject(FaIconLibrary);
  registerFontAwesomeIcons(library);
}

function createFixture<T>(component: Type<T>, inputs?: Partial<T>): ComponentFixture<T> {
  const fixture = TestBed.createComponent(component);
  if (inputs) {
    Object.entries(inputs).forEach(([key, value]) => {
      fixture.componentRef.setInput(key, value as never);
    });
  }
  fixture.detectChanges();
  return fixture;
}

describe('AddOrRemove', () => {
  beforeEach(async () => configure(AddOrRemove));

  it('emits add/remove actions', () => {
    const fixture = createFixture(AddOrRemove);
    const component = fixture.componentInstance;
    const addSpy = vi.spyOn(component.add, 'emit');
    const removeSpy = vi.spyOn(component.remove, 'emit');

    component.click('add');
    component.click('remove');

    expect(addSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();
  });
});

describe('AddBook', () => {
  beforeEach(async () => configure(AddBook));

  it('emits add when valid', () => {
    const fixture = createFixture(AddBook);
    const component = fixture.componentInstance;
    const addSpy = vi.spyOn(component.add, 'emit');

    component.bookTitle = 'New Book';
    component.ok();

    expect(addSpy).toHaveBeenCalledWith('New Book');
  });
});

describe('BookManager', () => {
  beforeEach(async () => configure(BookManager));

  it('dispatches add book', () => {
    const fixture = createFixture(BookManager);
    const store = TestBed.inject(MockStore);
    const spy = vi.spyOn(store, 'dispatch');

    fixture.componentInstance.add('Book');

    expect(spy).toHaveBeenCalled();
  });
});

describe('BookRecord', () => {
  beforeEach(async () => configure(BookRecord));

  it('dispatches setEditedBook', () => {
    const fixture = createFixture(BookRecord, {
      book: new Book('b1', 'Book'),
      index: 0,
    });
    const store = TestBed.inject(MockStore);
    const spy = vi.spyOn(store, 'dispatch');

    fixture.componentInstance.edit(fixture.componentInstance.book);

    expect(spy).toHaveBeenCalledWith(setEditedBook({ book: fixture.componentInstance.book }));
  });

  it('shows confirmation modal on trash', () => {
    const fixture = createFixture(BookRecord, {
      book: new Book('b1', 'Book'),
      index: 0,
    });
    const bus = TestBed.inject(MessageBusService);
    const spy = vi.spyOn(bus, 'showQuestionModal');

    fixture.componentInstance.trash(fixture.componentInstance.book);

    expect(spy).toHaveBeenCalled();
    const lastCall = spy.mock.calls[spy.mock.calls.length - 1];
    expect(lastCall?.[0] instanceof QuestionModalArgs).toBe(true);
  });
});

describe('BookSelector', () => {
  beforeEach(async () => configure(BookSelector));

  it('creates', () => {
    const fixture = createFixture(BookSelector);
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('BookTable', () => {
  beforeEach(async () => configure(BookTable));

  it('creates', () => {
    const fixture = createFixture(BookTable);
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('EditBook', () => {
  beforeEach(async () => configure(EditBook));

  it('dispatches edit when ok', () => {
    const fixture = createFixture(EditBook);
    const store = TestBed.inject(MockStore);
    const spy = vi.spyOn(store, 'dispatch');

    fixture.componentInstance.bookTitle = 'Updated';
    fixture.componentInstance.ok();

    expect(spy).toHaveBeenCalled();
  });
});

describe('AddChapter', () => {
  beforeEach(async () => configure(AddChapter));

  it('creates', () => {
    const fixture = createFixture(AddChapter);
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('ChapterManager', () => {
  beforeEach(async () => configure(ChapterManager));

  it('creates', () => {
    const fixture = createFixture(ChapterManager);
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('ChapterRecord', () => {
  beforeEach(async () => configure(ChapterRecord));

  it('shows confirmation modal on trash', () => {
    const chapter = new Chapter('c1', '1', 'Chapter', []);
    const fixture = createFixture(ChapterRecord, { chapter });
    const bus = TestBed.inject(MessageBusService);
    const spy = vi.spyOn(bus, 'showQuestionModal');

    fixture.componentInstance.trash(chapter);

    expect(spy).toHaveBeenCalled();
  });
});

describe('ChapterSelector', () => {
  beforeEach(async () => configure(ChapterSelector));

  it('creates', () => {
    const fixture = createFixture(ChapterSelector);
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('ChapterTable', () => {
  beforeEach(async () => configure(ChapterTable));

  it('creates', () => {
    const fixture = createFixture(ChapterTable);
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('EditChapter', () => {
  beforeEach(async () => configure(EditChapter));

  it('creates', () => {
    const fixture = createFixture(EditChapter);
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('ConfirmationModal', () => {
  beforeEach(async () => configure(ConfirmationModal));

  it('emits ok/cancel', () => {
    const fixture = createFixture(ConfirmationModal, { id: 'modal' });
    const component = fixture.componentInstance;
    const okSpy = vi.spyOn(component.ok, 'emit');
    const cancelSpy = vi.spyOn(component.cancel, 'emit');

    component.onOk();
    component.onCancel();

    expect(okSpy).toHaveBeenCalled();
    expect(cancelSpy).toHaveBeenCalled();
  });
});

describe('IconButtonComponent', () => {
  beforeEach(async () => configure(IconButtonComponent));

  it('emits click with argument', () => {
    const fixture = createFixture(IconButtonComponent, { icon: 'plus' });
    const component = fixture.componentInstance;
    const spy = vi.spyOn(component.buttonClick, 'emit');

    component.argument = 'arg';
    component.click();

    expect(spy).toHaveBeenCalledWith('arg');
  });
});

describe('ImportExport', () => {
  beforeEach(async () => configure(ImportExport));

  it('opens import modal', () => {
    const fixture = createFixture(ImportExport);
    fixture.componentInstance.importLib();
    expect(fixture.componentInstance.isImportOpen).toBe(true);
  });
});

describe('Library', () => {
  beforeEach(async () => configure(Library));

  it('creates', () => {
    const fixture = createFixture(Library);
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('LibraryDetails', () => {
  beforeEach(async () => configure(LibraryDetails));

  it('dispatches setLibraryName on ok', () => {
    const fixture = createFixture(LibraryDetails);
    const store = TestBed.inject(MockStore);
    const spy = vi.spyOn(store, 'dispatch');

    fixture.componentInstance.libraryName = 'New Name';
    fixture.componentInstance.ok();

    expect(spy).toHaveBeenCalled();
  });
});

describe('MemoryUsage', () => {
  beforeEach(async () => configure(MemoryUsage));

  it('creates', () => {
    const fixture = createFixture(MemoryUsage);
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('ClearButton', () => {
  beforeEach(async () => configure(ClearButton));

  it('dispatches clearQuestionList', () => {
    const fixture = createFixture(ClearButton);
    const store = TestBed.inject(MockStore);
    const spy = vi.spyOn(store, 'dispatch');

    fixture.componentInstance.clear();

    expect(spy).toHaveBeenCalledWith(clearQuestionList());
  });
});

describe('QuestionList', () => {
  beforeEach(async () => configure(QuestionList));

  it('creates', () => {
    const fixture = createFixture(QuestionList);
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('QuestionListRecord', () => {
  beforeEach(async () => configure(QuestionListRecord));

  it('dispatches removeFromQuestionList', () => {
    const question = new Question('q1', 'Q', 'A', '1');
    const fixture = createFixture(QuestionListRecord, { index: 0, question });
    const store = TestBed.inject(MockStore);
    const spy = vi.spyOn(store, 'dispatch');

    fixture.componentInstance.removeFromQuestionList(question);

    expect(spy).toHaveBeenCalledWith(removeFromQuestionList({ question }));
  });
});

describe('QuestionTrainer', () => {
  beforeEach(async () => configure(QuestionTrainer));

  it('creates', () => {
    const fixture = createFixture(QuestionTrainer);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it.todo('uses AI mode to check answers instead of showing them');
  it.todo('shows AI feedback when an answer is incorrect');
  it.todo('shows Continue after AI check completes');
});

describe('QuestionModal', () => {
  beforeEach(async () => configure(QuestionModal));

  it('opens with args', () => {
    const fixture = createFixture(QuestionModal);
    fixture.componentInstance.onShowQuestionModal(
      new QuestionModalArgs('Title', 'Text', () => undefined)
    );

    expect(fixture.componentInstance.isOpen).toBe(true);
  });
});

describe('AddQuestion', () => {
  beforeEach(async () => configure(AddQuestion));

  it('creates', () => {
    const fixture = createFixture(AddQuestion);
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('QuestionManager', () => {
  beforeEach(async () => configure(QuestionManager));

  it('creates', () => {
    const fixture = createFixture(QuestionManager);
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('QuestionRecord', () => {
  beforeEach(async () => configure(QuestionRecord));

  it('shows confirmation modal on trash', () => {
    const question = new Question('q1', 'Q', 'A', '1');
    const fixture = createFixture(QuestionRecord, { index: 0, question });
    const bus = TestBed.inject(MessageBusService);
    const spy = vi.spyOn(bus, 'showQuestionModal');

    fixture.componentInstance.trash(question);

    expect(spy).toHaveBeenCalled();
  });
});

describe('QuestionTable', () => {
  beforeEach(async () => configure(QuestionTable));

  it('creates', () => {
    const fixture = createFixture(QuestionTable);
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('TabPage', () => {
  beforeEach(async () => configure(TabPage));

  it('activates when default', () => {
    const fixture = createFixture(TabPage, { title: 'Tab', isDefault: true });
    expect(fixture.componentInstance.active).toBe(true);
  });
});

describe('Tabs', () => {
  beforeEach(async () => configure(Tabs));

  it('creates', () => {
    const fixture = createFixture(Tabs);
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('ViewMode', () => {
  beforeEach(async () => configure(ViewMode));

  it('toggles menu', () => {
    const fixture = createFixture(ViewMode);
    fixture.componentInstance.toggleMenu();
    expect(fixture.componentInstance.isOpen).toBe(true);
  });
});

describe('ViewModeItem', () => {
  beforeEach(async () => configure(ViewModeItem));

  it('emits selection when changed', () => {
    const fixture = createFixture(ViewModeItem, { viewMode: 'library', text: 'Library' });
    const component = fixture.componentInstance;
    const spy = vi.spyOn(component.select, 'emit');

    component.setViewMode(new Event('click'));

    expect(spy).toHaveBeenCalledWith('library');
  });
});
