import Question from '@/models/Question';

export default class MutationTypes {
  public static addBook: string = 'addBook';
  public static addChapter: string = 'addChapter';
  public static editChapter: string = 'editChapter';
  public static removeBookById: string = 'removeBookById';
  public static removeChapterById: string = 'removeChapterById';
  public static setEditedBook: string = 'setEditedBook';
  public static setEditedChapter: string = 'setEditedChapter';
  public static setBooks: string = 'setBooks';
  public static setSelectedBook: string = 'setSelectedBook';
  public static setSelectedChapter: string = 'setSelectedChapter';

  public static Question = class {
    public static addQuestion: string = 'addQuestion';
  };
}
