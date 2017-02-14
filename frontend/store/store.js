import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root_reducer';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const logger = createLogger();

const configureStore = (preloadedState = {}) => (
  createStore (
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, logger)
  )
);

export default configureStore;
