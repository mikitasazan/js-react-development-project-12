import {
  Alert,
  Card,
  Center,
  Flex,
  Group,
  Loader,
  Stack,
  Text,
} from '@mantine/core';
import { useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import ChannelModals from '../components/ChannelModals.jsx';
import Channels from '../components/Channels.jsx';
import MessageForm from '../components/MessageForm.jsx';
import Messages from '../components/Messages.jsx';
import useChatSocket from '../hooks/useChatSocket.js';
import clean from '../lib/profanity.js';
import {
  useApi,
  useAuthStore,
  useSocket,
  useUiStore,
} from '../contexts/appContext.js';

const ChatPage = () => {
  const { t } = useTranslation();
  const api = useApi();
  const socket = useSocket();
  const currentChannelId = useUiStore((state) => state.currentChannelId);
  const username = useAuthStore((state) => state.username);

  useChatSocket();

  useEffect(() => {
    socket.connect();
    return () => socket.disconnect();
  }, [socket]);

  const channels = useQuery({ queryKey: ['channels'], queryFn: api.getChannels });
  const messages = useQuery({ queryKey: ['messages'], queryFn: api.getMessages });

  // failureReason covers the request that failed but is still being retried:
  // without it a dead network leaves the user on a spinner with no message.
  const hasData = Boolean(channels.data && messages.data);
  const loadFailed = Boolean(
    channels.error || messages.error || channels.failureReason || messages.failureReason,
  );

  useEffect(() => {
    if (loadFailed) {
      notifications.show({ message: t('errors.dataLoad'), color: 'red' });
    }
  }, [loadFailed, t]);

  const sendMessage = useMutation({
    mutationFn: (body) => api.createMessage({ body, channelId: currentChannelId, username }),
    onError: () => notifications.show({ message: t('errors.network'), color: 'red' }),
  });

  if (loadFailed && !hasData) {
    return (
      <Center flex={1} p="md">
        <Alert color="red">{t('errors.dataLoad')}</Alert>
      </Center>
    );
  }

  if (!hasData) {
    return <Center flex={1}><Loader /></Center>;
  }

  const currentChannel = channels.data.find((c) => c.id === currentChannelId);
  const channelMessages = messages.data.filter((m) => m.channelId === currentChannelId);

  return (
    <>
    <ChannelModals channels={channels.data} />
    <Flex flex={1} mih={0} p="xs" gap="xs">
      <Card withBorder w={260} p="xs" style={{ flexShrink: 0 }}>
        <Channels channels={channels.data} />
      </Card>
      <Card withBorder flex={1} p={0}>
        <Stack gap={0} h="100%">
          <Group px="md" py="sm" bg="gray.0" wrap="nowrap">
            <Text fw={700} truncate>{currentChannel ? `# ${clean(currentChannel.name)}` : ''}</Text>
            <Text c="dimmed" style={{ whiteSpace: 'nowrap' }}>{t('chat.messageCount', { count: channelMessages.length })}</Text>
          </Group>
          <Messages messages={channelMessages} />
          <MessageForm onSend={sendMessage.mutateAsync} disabled={sendMessage.isPending} />
        </Stack>
      </Card>
    </Flex>
    </>
  );
};

export default ChatPage;
