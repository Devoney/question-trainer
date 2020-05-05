import { Book } from 'src/app/types/book';

export const clone = (object: any) => {
  const jsonString = JSON.stringify(object);
  return JSON.parse(jsonString);
};