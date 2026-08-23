import { create } from 'zustand';

const defaultChannelId = '1';

const useUiStore = create((set) => ({
  currentChannelId: defaultChannelId,
  setCurrentChannel: (id) => set({ currentChannelId: id }),
  resetCurrentChannel: () => set({ currentChannelId: defaultChannelId }),
}));

export default useUiStore;
