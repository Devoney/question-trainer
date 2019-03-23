import Question from './Question';

export default class Chapter {
  constructor(
    public id: string,
    public nr: string,
    public title: string,
    public questions: Question[] = [],
  ) {}
}
