import Chapter from './Chapter';

export default class Book {
  constructor(
    public id: string,
    public title: string,
    public chapters: Chapter[] = new Array<Chapter>()
  ) {}
}
