import axios from 'axios';
import { memoize } from 'lodash';

export type SearchedMovie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export const searchByTitle = memoize((title: string) => {
  return axios.get(`http://localhost:3001/search?s=${title}`);
});
