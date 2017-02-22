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

export const createChannel = (channel) => {
  return $.ajax({
    method: 'post',
    url: 'api/channels/public',
    data: { channel }
  });
};

export const createPublicSubscription = (channel_id) => {
  return $.ajax({
    method: 'post',
    url: `api/subscriptions`,
    data: { sub: channel_id }
  });
};
