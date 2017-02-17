import * as ChannelAPIUtil from '../util/channel_api_util';

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

export const signup = (user) => dispatch => {
  return SessionAPIUtil.signup(user).then(
    (user) => (dispatch(receiveCurrentUser(user))),
    (errors) => (dispatch(receiveErrors(errors.responseJSON)))
  );
};

export const fetchChannel = (userId, channelId) => dispatch => {
  return ChannelAPIUtil.fetchChannel(userId, channelId).then(
    (channel) => (dispatch(receiveChannel(channel)))
  );
};
