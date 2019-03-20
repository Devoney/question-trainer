import Question from './Question';

export default class Chapter {
  constructor(
    public nr: string,
    public title: string,
    public questions: Question[] = [],
  ) {}
}
