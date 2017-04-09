import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root_reducer';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import merge from 'lodash/merge';

const logger = createLogger();

const configureStore = (preloadedState = {}) => {
  return createStore (
    rootReducer,
    preloadedState,
    // applyMiddleware(thunk)
    applyMiddleware(thunk, logger)
  );
};

export default configureStore;
