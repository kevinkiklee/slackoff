import { OPEN_CHANNELS_VIEW_MODAL,
         CLOSE_CHANNELS_VIEW_MODAL,
         OPEN_CHANNEL_FORM_MODAL,
         CLOSE_CHANNEL_FORM_MODAL,
         OPEN_DIRECT_MESSAGE_MODAL,
         CLOSE_DIRECT_MESSAGE_MODAL } from '../actions/modal_actions';

import merge from 'lodash/merge';

const initialState = {
  channelsView: false,
  channelForm: false,
  directMessageForm: false,
  directMessageUser: []
};

const ModalReducer = (state = initialState, action) => {
  Object.freeze();

  switch (action.type) {
    case OPEN_CHANNELS_VIEW_MODAL:
      return merge({}, { channelsView: action.open });

    case CLOSE_CHANNELS_VIEW_MODAL:
      return merge({}, { channelsView: action.close });

    case OPEN_CHANNEL_FORM_MODAL:
      return merge({}, { channelForm: action.open });

    case CLOSE_CHANNEL_FORM_MODAL:
      return merge({}, { channelForm: action.close });

    case OPEN_DIRECT_MESSAGE_MODAL:
      return merge({}, { directMessageForm: action.open,
                         directMessageUser: action.user });

    case CLOSE_DIRECT_MESSAGE_MODAL:
      return initialState;
      
    default:
      return state;
  }
};

export default ModalReducer;
