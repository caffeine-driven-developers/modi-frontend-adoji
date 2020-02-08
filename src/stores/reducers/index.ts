import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import loading from './loading';
import movieList from './movieList';

export const initialState = {};

export default (history: History) =>
  combineReducers({
    loading,
    movieList,
    router: connectRouter(history),
  });
