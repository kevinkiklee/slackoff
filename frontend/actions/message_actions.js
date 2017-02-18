// import * as MessageAPIUtil from '../util/message_api_util';

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

export const receiveMessage = (message, channel, user) => ({
  type: RECEIVE_MESSAGE,
  message,
  channel,
  user
});

// export const createMessage = (message) => dispatch => {
//   return MessageAPIUtil.createMessage(message).then(
//     (channel) => (dispatch(receiveChannel(channel)))
//   );
// };
