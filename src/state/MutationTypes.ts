const bookPrefix: string = 'book/';

class MutationTypes {
  public static addBook = bookPrefix + 'addBook';
  public static addChapter = 'addChapter';
  public static editChapter = 'editChapter';
  public static removeBookById = bookPrefix + 'removeBookById';
  public static removeChapterById = 'removeChapterById';
  public static setEditedBook = bookPrefix + 'setEditedBook';
  public static setEditedChapter = 'setEditedChapter';
  public static setBooks = bookPrefix + 'setBooks';
  public static setSelectedBook = bookPrefix + 'setSelectedBook';
}

export default MutationTypes;
