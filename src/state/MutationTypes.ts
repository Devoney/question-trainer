import Question from '@/models/Question';

export default class MutationTypes {
  public static initialise = 'initialise';

  public static Book = class {
    public static addBook: string = 'addBook';
    public static editBook: string = 'editBook';
    public static removeBookById: string = 'removeBookById';
    public static setBooks: string = 'setBooks';
    public static setEditedBook: string = 'setEditedBook';
    public static setSelectedBook: string = 'setSelectedBook';
  };

  public static Chapter = class {
    public static addChapter: string = 'addChapter';
    public static editChapter: string = 'editChapter';
    public static removeChapterById: string = 'removeChapterById';
    public static setEditedChapter: string = 'setEditedChapter';
    public static setSelectedChapter: string = 'setSelectedChapter';
  };

  public static Question = class {
    public static addQuestion: string = 'addQuestion';
    public static editQuestion: string = 'editQuestion';
    public static setEditedQuestion: string = 'setEditedQuestion';
    public static removeQuestionById: string = 'removeQuestionById';
  };

  public static QuestionList = class {
    public static addToList: string = 'addToList';
    public static clear: string = 'clearList';
    public static removeFromList: string = 'removeFromList';
  };
}
