import * as SessionAPIUtil from '../util/session_api_util';

import { fetchChannel } from './channel_actions';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const UPDATE_SUBSCRIPTION = 'UPDATE_SUBSCRIPTION';

export const receiveCurrentUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  user
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const updateSubscription = (channel) => ({
  type: UPDATE_SUBSCRIPTION,
  channel
});

export const signup = (user) => dispatch => {
  return SessionAPIUtil.signup(user).then(
    (user) => (dispatch(receiveCurrentUser(user))),
    (errors) => (dispatch(receiveErrors(errors.responseJSON)))
  );
};

export const login = user => dispatch => (
  SessionAPIUtil.login(user).then(
    (user) => (dispatch(receiveCurrentUser(user))),
    (errors) => (dispatch(receiveErrors(errors.responseJSON)))
  )
);

export const logout = () => dispatch => {
  return SessionAPIUtil.logout().then((user) => (
    dispatch(receiveCurrentUser(null))
  ));
};

export const getUser = (id) => dispatch => {
  return SessionAPIUtil.getUser(id).then((user) => (
    dispatch(receiveCurrentUser(user))
  ));
};

export const deleteSubscription = (channelId) => dispatch => {
  return SessionAPIUtil.deleteSubscription(channelId)
    .then((user) => {
      dispatch(receiveCurrentUser(user));
      return user;
    });
};
