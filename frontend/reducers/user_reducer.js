import { RECEIVE_USERS } from '../actions/user_actions';

import merge from 'lodash/merge';

const initialState = {};

const UserReducer = (state = initialState, action) => {
  Object.freeze();

  switch (action.type) {
    case RECEIVE_USERS:
      return merge({}, action.users);

    default:
      return state;
  }
};

export default UserReducer;
