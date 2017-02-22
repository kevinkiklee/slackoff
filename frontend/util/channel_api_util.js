export const fetchPublicChannels = () => {
  return $.ajax({
    method: 'get',
    url: 'api/channels/public'
  });
};

export const fetchChannel = (userId, channelId) => {
  return $.ajax({
    method: 'get',
    url: `api/users/${userId}/channels/${channelId}`
  });
};

export const createChannel = (channel) => {
  // debugger
  return $.ajax({
    method: 'post',
    url: 'api/channels',
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
