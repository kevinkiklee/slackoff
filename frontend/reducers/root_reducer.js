import { combineReducers } from 'redux';

import SessionReducer from './session_reducer';
import CurrentChannelReducer from './current_channel_reducer';
import ChannelReducer from './channel_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  channel: ChannelReducer,
  currentChannel: CurrentChannelReducer
});

export default RootReducer;
