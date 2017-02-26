import * as MessageAPIUtil from '../util/message_api_util';

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';
export const EDIT_MESSAGE = 'EDIT_MESSAGE';

export const receiveMessage = (message, channel, user) => ({
  type: RECEIVE_MESSAGE,
  message,
  channel,
  user
});

export const editMessage = (message) => ({
  type: EDIT_MESSAGE,
  message
});

export const removeMessage = (id) => ({
  type: REMOVE_MESSAGE,
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
