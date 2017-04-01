import * as EmoticonAPIUtil from '../util/emoticon_api_util';

import

export const ADD_EMOTICON = 'ADD_EMOTICON';
export const REMOVE_EMOTICON = 'REMOVE_EMOTICON';

// export const receiveEmoticon = (message, channel, user) => ({
//   type: ADD_EMOTICON,
//   message
// });
//
// export const removeEmoticon = (id) => ({
//   type: REMOVE_EMOTICON,
//   id
// });



export const updateEmoticon = (message) => dispatch => {
  return EmoticonAPIUtil.updateEmoticon(message)
    .then((message) => dispatch(editEmoticon(message)));
};

export const deleteEmoticon = (id) => dispatch => {
  return EmoticonAPIUtil.deleteEmoticon(id)
    .then((id) => dispatch(removeEmoticon(id)));
};
