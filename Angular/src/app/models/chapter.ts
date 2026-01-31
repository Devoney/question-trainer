import { Question } from './question';

export class Chapter {
  constructor(
    public id: string,
    public nr: string,
    public title: string,
    public questions: Question[] = []
  ) {}
}
