import { OPEN_CHANNELS_VIEW_MODAL,
         CLOSE_CHANNELS_VIEW_MODAL } from '../actions/modal_actions';

import merge from 'lodash/merge';

const initialState = {
  channelsView: false
};

const ModalReducer = (state = initialState, action) => {
  Object.freeze();

  switch (action.type) {
    case OPEN_CHANNELS_VIEW_MODAL:
      return merge({}, { channelsView: action.open });

    case CLOSE_CHANNELS_VIEW_MODAL:
      return merge({}, { channelsView: action.close });

    default:
      return state;
  }
};

export default ModalReducer;
