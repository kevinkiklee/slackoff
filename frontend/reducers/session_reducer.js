import { RECEIVE_ERRORS,
         RECEIVE_CURRENT_USER,
         CLEAR_ERRORS } from '../actions/session_actions';

import merge from 'lodash/merge';

const initialState = {
  currentUser: null,
  errors: []
};

const SessionReducer = (state = initialState, action) => {
  Object.freeze();

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, initialState, { currentUser: action.user,
                                            errors: [] });

    case RECEIVE_ERRORS:
      return merge({}, initialState, { errors: action.errors,
                                       currentUser: null });
    case CLEAR_ERRORS:
      // return merge({}, initialState, { errors: [] });
      return initialState;

    default:
      return state;
  }
};

export default SessionReducer;
