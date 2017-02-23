import { RECEIVE_ALL_PUBLIC_CHANNELS } from '../actions/channel_actions';

import merge from 'lodash/merge';

const initialState = [];

const AllChannelsReducer = (state = initialState, action) => {
  Object.freeze();

  switch (action.type) {
    case RECEIVE_ALL_PUBLIC_CHANNELS:
      return merge({}, action.channels);

    default:
      return state;
  }
};

export default AllChannelsReducer;
