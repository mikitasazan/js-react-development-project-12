import { createStore } from 'zustand';

export const defaultChannelId = '1';

const createUiStore = () => createStore((set) => ({
  currentChannelId: defaultChannelId,
  modal: { type: null, channelId: null },
  setCurrentChannel: (id) => set({ currentChannelId: id }),
  resetCurrentChannel: () => set({ currentChannelId: defaultChannelId }),
  openModal: (type, channelId = null) => set({ modal: { type, channelId } }),
  closeModal: () => set({ modal: { type: null, channelId: null } }),
}));

export default createUiStore;
