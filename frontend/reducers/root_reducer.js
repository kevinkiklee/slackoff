import SessionReducer from './session_reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  session: SessionReducer,
});

export default rootReducer;
