export const OPEN_CHANNEL_VIEW_MODAL = 'OPEN_CHANNEL_VIEW_MODAL';
export const CLOSE_CHANNEL_VIEW_MODAL = 'CLOSE_CHANNEL_VIEW_MODAL';

export const openChannelViewModal = () => ({
  type: OPEN_CHANNEL_VIEW_MODAL,
  open: true
});

export const closeChannelViewModal = () => ({
  type: CLOSE_CHANNEL_VIEW_MODAL,
  open: false
});
