import { Book } from './book';
import { Chapter } from './chapter';
import { Question } from './question';

describe('models', () => {
  it('constructs Book with defaults', () => {
    const book = new Book('id', 'Title');
    expect(book.id).toBe('id');
    expect(book.title).toBe('Title');
    expect(book.chapters.length).toBe(0);
  });

  it('Book.questions flattens chapters', () => {
    const q1 = new Question('q1', 'Q1', 'A1', '1');
    const q2 = new Question('q2', 'Q2', 'A2', '2');
    const c1 = new Chapter('c1', '1', 'C1', [q1]);
    const c2 = new Chapter('c2', '2', 'C2', [q2]);
    const book = new Book('b1', 'B1', [c1, c2]);

    expect(Book.questions(book)).toEqual([q1, q2]);
  });

  it('constructs Chapter and Question', () => {
    const q = new Question('q1', 'Q', 'A', '1');
    const c = new Chapter('c1', '1', 'C', [q]);

    expect(c.questions[0]).toBe(q);
  });
});
