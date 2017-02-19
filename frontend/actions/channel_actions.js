import * as ChannelAPIUtil from '../util/channel_api_util';
import * as MessageAPIUtil from '../util/message_api_util';

export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

export const receiveChannel = (channel) => ({
  type: RECEIVE_CHANNEL,
  channel
});

export const receiveMessage = (message) => ({
  type: RECEIVE_MESSAGE,
  message
});

export const fetchChannel = (userId, channelId) => dispatch => {
  return ChannelAPIUtil.fetchChannel(userId, channelId).then(
    (channel) => (dispatch(receiveChannel(channel)))
  );
};

export const createMessage = (message) => dispatch => {
  return MessageAPIUtil.createMessage(message);
};
