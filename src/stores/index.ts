import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer, { initialState } from './reducers';
import rootSaga from './saga';

const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV === 'development') {
    const { composeWithDevTools } = require('redux-devtools-extension'); // eslint-disable-line
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const history = createBrowserHistory();

function configureStore(preloadedState: any = initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    bindMiddleware([sagaMiddleware, routerMiddleware(history)]),
  );

  (store as any).sagaTask = sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer(history));
    });
  }
  return store;
}

export default configureStore;
