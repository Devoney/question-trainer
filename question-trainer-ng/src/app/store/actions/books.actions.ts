import { Action } from '@ngrx/store';
import { Book } from 'src/app/types/Book';

export enum BooksActionTypes {
  Add = '[Books] Add',
  Remove = '[Books] Remove',
}

export class AddBook implements Action {
  public readonly type = BooksActionTypes.Add;

  constructor(
    public payload: Book
  ) {}
}

export class RemoveBook implements Action {
  public readonly type = BooksActionTypes.Remove;
}

export type BooksAction = AddBook | RemoveBook;
