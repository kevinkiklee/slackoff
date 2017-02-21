import { OPEN_CHANNEL_VIEW_MODAL,
         CLOSE_CHANNEL_VIEW_MODAL } from '../actions/modal_actions';

import merge from 'lodash/merge';

const initialState = {
  channelView: false
};

const ModalReducer = (state = initialState, action) => {
  Object.freeze();

  switch (action.type) {
    case OPEN_CHANNEL_VIEW_MODAL:
      return merge({}, { channelView: action.open });

    case CLOSE_CHANNEL_VIEW_MODAL:
      return merge({}, { channelView: action.close });

    default:
      return state;
  }
};

export default ModalReducer;
