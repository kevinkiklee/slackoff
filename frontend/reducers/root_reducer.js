import { combineReducers } from 'redux';

import SessionReducer from './session_reducer';
import CurrentChannelReducer from './current_channel_reducer';
import ChannelReducer from './channel_reducer';
import AllChannelsReducer from './all_channels_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  channel: ChannelReducer,
  currentChannel: CurrentChannelReducer,
  allChannels: AllChannelsReducer
});

export default RootReducer;
