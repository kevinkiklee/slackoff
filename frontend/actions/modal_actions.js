export const OPEN_CHANNELS_VIEW_MODAL = 'OPEN_CHANNELS_VIEW_MODAL';
export const CLOSE_CHANNELS_VIEW_MODAL = 'CLOSE_CHANNELS_VIEW_MODAL';

export const openChannelsViewModal = () => ({
  type: OPEN_CHANNELS_VIEW_MODAL,
  open: true
});

export const closeChannelsViewModal = () => ({
  type: CLOSE_CHANNELS_VIEW_MODAL,
  open: false
});

export const OPEN_CHANNEL_FORM_MODAL = 'OPEN_CHANNEL_FORM_MODAL';
export const CLOSE_CHANNEL_FORM_MODAL = 'CLOSE_CHANNEL_FORM_MODAL';

export const openChannelFormModal = () => ({
  type: OPEN_CHANNEL_FORM_MODAL,
  open: true
});

export const closeChannelFormModal = () => ({
  type: CLOSE_CHANNEL_FORM_MODAL,
  open: false
});
