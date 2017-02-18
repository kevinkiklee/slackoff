import * as ChannelAPIUtil from '../util/channel_api_util';
import * as MessageAPIUtil from '../util/message_api_util';

export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';

export const receiveChannel = (channel) => ({
  type: RECEIVE_CHANNEL,
  channel
});

// export const receiveErrors = (errors) => ({
//   type: RECEIVE_ERRORS,
//   errors
// });
//
// export const clearErrors = () => ({
//   type: CLEAR_ERRORS
// });

export const fetchChannel = (userId, channelId) => dispatch => {
  return ChannelAPIUtil.fetchChannel(userId, channelId).then(
    (channel) => (dispatch(receiveChannel(channel)))
  );
};

export const createMessage = (message) => dispatch => {
  return MessageAPIUtil.createMessage(message).then(
    (channel) => (dispatch(receiveChannel(channel)))
  );
};
