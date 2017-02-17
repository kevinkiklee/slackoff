import { SWITCH_CHANNEL,
         SET_CHANNEL } from '../actions/current_channel_actions';

import merge from 'lodash/merge';

const initialState = {
  id: null,
  name: null,
  description: null
};

const CurrentChannelReducer = (state = initialState, action) => {
  Object.freeze();

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

export default CurrentChannelReducer;
