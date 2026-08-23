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
import useAuthStore from '../store/authStore.js';
import useUiStore from '../store/uiStore.js';
import clean from '../lib/profanity.js';
import client from '../api/client.js';
import { channelsQuery, messagesQuery } from '../api/chat.js';
import { apiRoutes } from '../routes.js';

const ChatPage = () => {
  const { t } = useTranslation();
  const currentChannelId = useUiStore((state) => state.currentChannelId);
  const username = useAuthStore((state) => state.username);

  useChatSocket();

  const channels = useQuery(channelsQuery);
  const messages = useQuery(messagesQuery);

  const loadFailed = channels.isError || messages.isError;

  useEffect(() => {
    if (loadFailed) {
      notifications.show({ message: t('errors.dataLoad'), color: 'red' });
    }
  }, [loadFailed, t]);

  const sendMessage = useMutation({
    mutationFn: (body) => client
      .post(apiRoutes.messages(), { body, channelId: currentChannelId, username })
      .then((r) => r.data),
    onError: () => notifications.show({ message: t('errors.network'), color: 'red' }),
  });

  if (channels.isPending || messages.isPending) {
    return <Center flex={1}><Loader /></Center>;
  }

  if (loadFailed) {
    return (
      <Center flex={1} p="md">
        <Alert color="red">{t('errors.dataLoad')}</Alert>
      </Center>
    );
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
