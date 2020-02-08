import { SearchedMovie } from './../../services/omdb';
import { cloneDeep } from 'lodash';
import { createActionCreator, createReducer } from 'deox';
export type MovieListState = {
  currentMovieList: SearchedMovie[];
};
export const initialState: MovieListState = {
  currentMovieList: [],
};

export const movieListActions = {
  updateCurrentMovieList: createActionCreator(
    'movieList/UPDATE_CURRENT_MOVIE_LIST',
    resolve => (newSearchResult: SearchedMovie[]) => resolve(newSearchResult),
  ),
  pushSearchedMovie: createActionCreator(
    'movieList/PUSH_SEARCHED_MOVIE',
    resolve => (newSearchResult: SearchedMovie) => resolve(newSearchResult),
  ),
};

const movieListReducer = createReducer(initialState, handleAction => [
  handleAction(movieListActions.updateCurrentMovieList, (state, { payload }) => {
    const newState = cloneDeep(state);
    newState.currentMovieList = payload;
    return newState;
  }),
  handleAction(movieListActions.pushSearchedMovie, (state, { payload }) => {
    if (state.currentMovieList.findIndex(x => x.imdbID === payload.imdbID) >= 0) {
      // NOTE: do not push if duplicated
      return state;
    }
    const newState = cloneDeep(state);
    newState.currentMovieList.push(payload);
    return newState;
  }),
]);

export default movieListReducer;
