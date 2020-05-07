import { Action } from '@ngrx/store';
import { Chapter } from 'src/app/types/chapter';

export enum ChaptersActionTypes {
    Add = '[Chapter] Add',
}

export class AddChapter implements Action {
    public readonly type = ChaptersActionTypes.Add;

    constructor (
      public bookId: string,
      public chapter: Chapter,
    ) {

    }
}

export type ChaptersAction = AddChapter;
