import { OPEN_CHANNELS_VIEW_MODAL,
         CLOSE_CHANNELS_VIEW_MODAL,
         OPEN_CHANNEL_FORM_MODAL,
         CLOSE_CHANNEL_FORM_MODAL } from '../actions/modal_actions';

import merge from 'lodash/merge';

const initialState = {
  channelsView: false,
  channelForm: false
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

    default:
      return state;
  }
};

export default ModalReducer;
