import { Book } from 'src/app/types/book';
import { Guid } from 'src/tools/Guid';
import { Chapter } from 'src/app/types/chapter';

export const getRandomBook = (): Book => {
  return {
    id: Guid.newGuid(),
    title: Guid.newGuid().substring(0, 6),
    chapters: []
  };
};

export const getRandomBookWithChapters = (nrOfChapters: number): Book => {
  const book = getRandomBook();
  for (let i = 0; i < nrOfChapters; i++) {
    const chapter = getRandomChapter();
    chapter.nr = (i + 1) + '';
    book.chapters.push(chapter);
  }
  return book;
};

export const getRandomChapter = (): Chapter => {
  return {
    id: Guid.newGuid(),
    nr: Guid.newGuid().substring(0, 6),
    title: Guid.newGuid().substring(0, 6),
  };
};

export const getBookWithTitle = (title: string): Book => {
  const book = getRandomBook();
  book.title = title;
  return book;
};
