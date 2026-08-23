import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

/** A fresh store per application run: nothing carries over between runs. */
const createAuthStore = () => createStore(
  persist(
    (set) => ({
      token: null,
      username: null,
      logIn: ({ token, username }) => set({ token, username }),
      logOut: () => set({ token: null, username: null }),
    }),
    { name: 'hexlet-chat-auth' },
  ),
);

export default createAuthStore;
