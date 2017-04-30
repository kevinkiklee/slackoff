import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root_reducer';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import merge from 'lodash/merge';

const logger = createLogger();
const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

const configureStore = (preloadedState = {}) => {
  return createStore (
    rootReducer,
    preloadedState,
    applyMiddleware(...middlewares)
  );
};

export default configureStore;
