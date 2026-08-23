import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useSocket, useUiStore } from '../contexts/appContext.js';

/** Keeps the cached channels and messages in step with the server. */
const useChatSocket = () => {
  const queryClient = useQueryClient();
  const socket = useSocket();
  const resetCurrentChannel = useUiStore((state) => state.resetCurrentChannel);
  const currentChannelId = useUiStore((state) => state.currentChannelId);

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

      if (currentChannelId === id) {
        resetCurrentChannel();
      }
    };

    socket.on('newMessage', addMessage);
    socket.on('newChannel', addChannel);
    socket.on('renameChannel', renameChannel);
    socket.on('removeChannel', removeChannel);

    return () => {
      socket.off('newMessage', addMessage);
      socket.off('newChannel', addChannel);
      socket.off('renameChannel', renameChannel);
      socket.off('removeChannel', removeChannel);
    };
  }, [queryClient, socket, currentChannelId, resetCurrentChannel]);
};

export default useChatSocket;
