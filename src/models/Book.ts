import _ from 'lodash';
import Chapter from '@/models/Chapter';
import Question from '@/models/Question';

export default class Book {
  constructor(
    public id: string,
    public title: string,
    public chapters: Chapter[] = new Array<Chapter>(),
  ) {}

  public get questions(): Question[] {
    if (this.chapters === undefined || this.chapters.length === 0) { return []; }
    const questionsArray = _.map(this.chapters, (chapter) => {
      return chapter.questions;
    });
    return _.flatten(questionsArray);
  }
}
