import Question from '@/models/Question';

export default class MutationTypes {
  public static addChapter: string = 'addChapter';
  public static editChapter: string = 'editChapter';
  public static removeChapterById: string = 'removeChapterById';

  public static setEditedChapter: string = 'setEditedChapter';
  public static setSelectedChapter: string = 'setSelectedChapter';

  public static Book = class {
    public static addBook: string = 'addBook';
    public static removeBookById: string = 'removeBookById';
    public static setBooks: string = 'setBooks';
    public static setEditedBook: string = 'setEditedBook';
    public static setSelectedBook: string = 'setSelectedBook';
  };

  public static Question = class {
    public static addQuestion: string = 'addQuestion';
  };
}
