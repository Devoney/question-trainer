import { Book } from 'src/app/types/book'
import { Guid } from 'src/tools/Guid';

export const getRandomBook = (): Book => {
  return {
    title: Guid.newGuid().substring(0, 6),
    id: Guid.newGuid(),
  };
};