import { createContext, useContext } from 'react';
import { useStore } from 'zustand';

/** Holds everything one application run owns: its stores, api and socket. */
export const AppContext = createContext(null);

const useApp = () => useContext(AppContext);

export const useAuthStore = (selector) => useStore(useApp().authStore, selector);
export const useUiStore = (selector) => useStore(useApp().uiStore, selector);
export const useApi = () => useApp().api;
export const useSocket = () => useApp().socket;
