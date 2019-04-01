import Book from '@/models/Book';

export default interface IBookModuleData {
    books: Book[];
    bookSelected: Book | undefined;
    bookEdited: Book | undefined;
}