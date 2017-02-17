// export const fetchChannels = () => {
//   return $.ajax({
//     method: 'get',
//     url: 'api/users/channels'
//   });
// };

export const fetchChannel = (userId, channelId) => {
  return $.ajax({
    method: 'get',
    url: `api/users/${userId}/channels/${channelId}`
  });
};
