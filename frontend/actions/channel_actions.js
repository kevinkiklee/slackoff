import * as ChannelAPIUtil from '../util/channel_api_util';
import * as MessageAPIUtil from '../util/message_api_util';

export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const RECEIVE_ALL_PUBLIC_CHANNELS = 'RECEIVE_ALL_PUBLIC_CHANNELS';
export const RECEIVE_ALL_PRIVATE_CHANNELS = 'RECEIVE_ALL_PRIVATE_CHANNELS';

export const receivePublicChannels = (channels) => ({
  type: RECEIVE_ALL_PUBLIC_CHANNELS,
  channels
});

export const receivePrivateChannels = (channels) => ({
  type: RECEIVE_ALL_PRIVATE_CHANNELS,
  channels
});

export const receiveChannel = (channel) => ({
  type: RECEIVE_CHANNEL,
  channel
});

export const receiveMessage = (message) => ({
  type: RECEIVE_MESSAGE,
  message
});

export const fetchPublicChannels = () => dispatch => {
  return ChannelAPIUtil.fetchPublicChannels().then(
    (channels) => (dispatch(receivePublicChannels(channels)))
  );
};

export const fetchChannel = (userId, channelId) => dispatch => {
  return ChannelAPIUtil.fetchChannel(userId, channelId).then(
    (channel) => (dispatch(receiveChannel(channel)))
  );
};

export const createMessage = (message) => dispatch => {
  return MessageAPIUtil.createMessage(message);
};
