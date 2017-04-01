import * as EmoticonAPIUtil from '../util/emoticon_api_util';

export const RECEIVE_EMOTICON = 'RECEIVE_EMOTICON';
export const REMOVE_EMOTICON = 'REMOVE_EMOTICON';

export const receiveMessage = (message, channel, user) => ({
  type: RECEIVE_EMOTICON,
  message,
  channel,
  user
});

export const removeMessage = (id) => ({
  type: REMOVE_EMOTICON,
  id
});



export const updateMessage = (message) => dispatch => {
  return MessageAPIUtil.updateMessage(message)
    .then((message) => dispatch(editMessage(message)));
};

export const deleteMessage = (id) => dispatch => {
  return MessageAPIUtil.deleteMessage(id)
    .then((id) => dispatch(removeMessage(id)));
};
