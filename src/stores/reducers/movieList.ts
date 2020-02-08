import { SearchedMovie } from './../../services/omdb';
import { cloneDeep } from 'lodash';
import { createActionCreator, createReducer } from 'deox';
type MovieListState = {
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
    state.currentMovieList = payload;
    return newState;
  }),
  handleAction(movieListActions.pushSearchedMovie, (state, { payload }) => {
    const newState = cloneDeep(state);
    state.currentMovieList.push(payload);
    return newState;
  }),
]);

export default movieListReducer;
