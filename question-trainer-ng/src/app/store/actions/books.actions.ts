import { Action } from '@ngrx/store';
import { Book } from 'src/app/types/book';

export enum BooksActionTypes {
  Add = '[Books] Add',
  Remove = '[Books] Remove',
  SetBookIdToEdit = '[Books] SetBookIdToEdit',
  SetSelectedBookId = '[Books] SetSelectedBookId',
  UpdateBook = '[Books] UpdateBook',
}

export class AddBook implements Action {
  public readonly type = BooksActionTypes.Add;

  constructor(
    public payload: Book
  ) {}
}

export class RemoveBook implements Action {
  public readonly type = BooksActionTypes.Remove;

  constructor(
    public bookId: string
  ) {}
}

export class SetBookIdToEdit implements Action {
  public readonly type = BooksActionTypes.SetBookIdToEdit;

  constructor(
    public bookId: string
  ) {

  }
}

export class UpdateBook implements Action {
  public readonly type = BooksActionTypes.UpdateBook;

  constructor(
    public book: Book
  ) {

  }
}

export class SetSelectedBookId implements Action {
  public readonly type = BooksActionTypes.SetSelectedBookId;

  constructor(
    public bookId: string,
  ) {

  }
}

export type BooksAction = AddBook | RemoveBook | SetBookIdToEdit | SetSelectedBookId | UpdateBook;
