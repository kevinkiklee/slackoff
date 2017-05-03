import { RECEIVE_MESSAGE } from '../actions/message_action';

import merge from 'lodash/merge';

const initialState = {};

const MessageReducer = (state = initialState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case SWITCH_CHANNEL:
      return merge({}, initialState, { id: action.id,
                                       name: action.name,
                                       description: action.description });
    case SET_CHANNEL:
      return merge({}, initialState, { id: action.id,
                                       name: action.name,
                                       description: action.description });

    default:
      return state;
  }
};

export default MessageReducer;
