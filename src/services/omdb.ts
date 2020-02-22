import { memoize } from 'lodash';
import http from './http';

export type SearchedMovie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export const searchByTitle = memoize((title: string) => {
  return http.get(`http://localhost:3001/search?s=${title}`);
});
