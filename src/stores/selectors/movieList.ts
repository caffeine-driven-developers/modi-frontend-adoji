import { createSelector } from 'reselect';
import { MovieListState } from './../reducers/movieList';

const movieListSelector = (state: any) => state.movieList as MovieListState;

export const currentMovieListSelector = createSelector(
  movieListSelector,
  movieList => movieList.currentMovieList,
);
