import _ from 'lodash';
import Chapter from '@/models/Chapter';
import Question from '@/models/Question';

export default class Book {

  public static questions(book: Book): Question[] {
    if (book.chapters === undefined || book.chapters.length === 0) { return []; }
    const questionsArray = _.map(book.chapters, (chapter) => {
      return chapter.questions;
    });
    return _.flatten(questionsArray);
  }
  constructor(
    public id: string,
    public title: string,
    public chapters: Chapter[] = new Array<Chapter>(),
  ) {}
}
