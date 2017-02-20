export const fetchPublicChannels = () => {
  return $.ajax({
    method: 'get',
    url: 'api/channels/public'
  });
};

export const fetchPrivateChannels = () => {
  return $.ajax({
    method: 'get',
    url: `api/users/${userId}/channels/private`
  });
};

export const fetchChannel = (userId, channelId) => {
  return $.ajax({
    method: 'get',
    url: `api/users/${userId}/channels/${channelId}`
  });
};
