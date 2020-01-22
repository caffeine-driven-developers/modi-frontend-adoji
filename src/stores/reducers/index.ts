import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import loading from './loading';

export const initialState = {};

export default (history: History) =>
  combineReducers({
    loading,
    router: connectRouter(history),
  });
