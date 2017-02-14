import { RECEIVE_ERRORS,
         RECEIVE_CURRENT_USER } from '../actions/session_actions';
import merge from 'lodash/merge';

const initialState = {
  currentUser: null,
  errors: []
};

const SessionReducer = (state = initialState, action) => {
  Object.freeze();

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, state, { currentUser: action.user,
                                errors: [] });

    case RECEIVE_ERRORS:
      return merge({}, state, { errors: action.errors,
                                currentUser: null });

    default:
      return state;
  }
};

export default SessionReducer;
