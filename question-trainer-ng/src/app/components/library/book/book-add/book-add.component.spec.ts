import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { BookAddComponent } from './book-add.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('BookAddComponent', () => {
  let component: BookAddComponent;
  let fixture: ComponentFixture<BookAddComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookAddComponent ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.debugElement.nativeElement as HTMLElement;
  });

  function bookTitleInputElement(): HTMLInputElement {
    return nativeElement.querySelector('input[formcontrolname="bookTitle"]') as HTMLInputElement;
  }

  function getBookTitle(): string {
    const bookTitleInput = bookTitleInputElement();
    return bookTitleInput.value;
  }

  function setBookTitle(value: string): void {
    const bookTitleInput = bookTitleInputElement();
    bookTitleInput.value = value;
    bookTitleInput.dispatchEvent(new Event('input'));
    component.bookTitleIsEmpty$.next(!value); // TODO: Would be nice not to manage this here.
    fixture.detectChanges();
  }

  const buttonId = '#btn-ok-book';

  function getAddButton(): HTMLButtonElement
  {
    return nativeElement.querySelector(buttonId) as HTMLButtonElement;
  }

  function clickAddButton() {
    const addButton = getAddButton();
    if (addButton.disabled) {
      console.log('WARNING: ' + buttonId + ' is disabled');
    }
    addButton.click();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('User interaction', () => {
    it('When user presses add button, without title, no event is raised.', () => {
      // Given
      setBookTitle('');
      let addBookEvent = false;
      component.addBook.subscribe((bookTitle: string) => {
        addBookEvent = true;
      });

      // When
      clickAddButton();

      // Then
      expect(addBookEvent).toBeFalse();
    });

    it('When user presses add button, with title, add event is raised with book title as argument.', () => {
      // Given
      const expectedBookTitle = 'My big TOE';
      let actualBookTitle: string = null;
      setBookTitle(expectedBookTitle);
      let addBookEvent = false;
      component.addBook.subscribe((bookTitle: string) => {
        addBookEvent = true;
        actualBookTitle = bookTitle;
      });

      // When
      clickAddButton();

      // Then
      expect(addBookEvent).toBeTrue();
      expect(actualBookTitle).toBe(expectedBookTitle);
    });

    it('When user adds book, the title is emptied.', () => {
      // Given
      setBookTitle('My big TOE');

      // When
      clickAddButton();
      const actualBookTitle = getBookTitle();

      // Then
      expect(actualBookTitle).toBeFalsy();
    });

    it('Without a title the add button is disabled.', () => {
      // Given
      const bookTitle = '';

      // When
      setBookTitle(bookTitle);

      // Then
      const addButton = getAddButton();
      expect(addButton.disabled).toBeTrue();
    });

    it('With a title the add button is enabled.', () => {
      // Given
      const bookTitle = 'My title';

      // When
      setBookTitle(bookTitle);

      // Then
      const addButton = getAddButton();
      expect(addButton.disabled).toBeFalse();
    });
  });
});
