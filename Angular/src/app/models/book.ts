import _ from 'lodash';
import { Chapter } from './chapter';
import { Question } from './question';

export class Book {
  public static questions(book: Book): Question[] {
    if (!book.chapters || book.chapters.length === 0) {
      return [];
    }
    const questionsArray = _.map(book.chapters, (chapter) => chapter.questions);
    return _.flatten(questionsArray);
  }

  constructor(
    public id: string,
    public title: string,
    public chapters: Chapter[] = []
  ) {}
}
