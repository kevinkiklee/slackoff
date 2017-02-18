import { RECEIVE_CHANNEL } from '../actions/channel_actions';
import { RECEIVE_MESSAGE } from '../actions/message_actions';

import merge from 'lodash/merge';

const initialState = {};

const ChannelReducer = (state = initialState, action) => {
  Object.freeze();

  switch (action.type) {
    case RECEIVE_CHANNEL:
      // debugger
      return merge({}, {
        id: action.channel.id,
        name: action.channel.name,
        description: action.channel.description,
        userCount: 5,
        messages: action.channel.messages
      });

    // case RECEIVE_MESSAGE:
    //   return  merge({}, state, {
    //     messages: {
    //
    //     }
    //   });

    default:
      return state;
  }
};

export default ChannelReducer;
