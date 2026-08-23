import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import socket from '../api/socket.js';
import useUiStore from '../store/uiStore.js';

/** Keeps the cached channels and messages in step with the server. */
const useChatSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const addMessage = (message) => {
      queryClient.setQueryData(['messages'], (old = []) => (
        old.some((m) => m.id === message.id) ? old : [...old, message]
      ));
    };

    const addChannel = (channel) => {
      queryClient.setQueryData(['channels'], (old = []) => (
        old.some((c) => c.id === channel.id) ? old : [...old, channel]
      ));
    };

    const renameChannel = ({ id, name }) => {
      queryClient.setQueryData(['channels'], (old = []) => (
        old.map((c) => (c.id === id ? { ...c, name } : c))
      ));
    };

    // Anyone standing in a channel that is gone falls back to the default one.
    const removeChannel = ({ id }) => {
      queryClient.setQueryData(['channels'], (old = []) => old.filter((c) => c.id !== id));
      queryClient.setQueryData(['messages'], (old = []) => old.filter((m) => m.channelId !== id));

      const ui = useUiStore.getState();
      if (ui.currentChannelId === id) {
        ui.resetCurrentChannel();
      }
    };

    socket.on('newMessage', addMessage);
    socket.on('newChannel', addChannel);
    socket.on('renameChannel', renameChannel);
    socket.on('removeChannel', removeChannel);
    socket.connect();

    return () => {
      socket.off('newMessage', addMessage);
      socket.off('newChannel', addChannel);
      socket.off('renameChannel', renameChannel);
      socket.off('removeChannel', removeChannel);
      socket.disconnect();
    };
  }, [queryClient]);
};

export default useChatSocket;
