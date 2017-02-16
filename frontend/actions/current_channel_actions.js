export const SWITCH_CHANNEL = 'SWITCH_CHANNEL';

export const switchChannel = (channel) => ({
  type: SWITCH_CHANNEL,
  id: channel.id,
  name: channel.name,
  description: channel.description
});
