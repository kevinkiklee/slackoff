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
