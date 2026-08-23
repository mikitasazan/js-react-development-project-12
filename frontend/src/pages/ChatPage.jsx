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
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import Channels from '../components/Channels.jsx';
import MessageForm from '../components/MessageForm.jsx';
import Messages from '../components/Messages.jsx';
import useChatSocket from '../hooks/useChatSocket.js';
import useAuthStore from '../store/authStore.js';
import useUiStore from '../store/uiStore.js';
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

  const sendMessage = useMutation({
    mutationFn: (body) => client
      .post(apiRoutes.messages(), { body, channelId: currentChannelId, username })
      .then((r) => r.data),
  });

  if (channels.isPending || messages.isPending) {
    return <Center h="100vh"><Loader /></Center>;
  }

  if (channels.isError || messages.isError) {
    return (
      <Center h="100vh" p="md">
        <Alert color="red">{t('errors.network')}</Alert>
      </Center>
    );
  }

  const currentChannel = channels.data.find((c) => c.id === currentChannelId);
  const channelMessages = messages.data.filter((m) => m.channelId === currentChannelId);

  return (
    <Flex h="100vh" p="xs" gap="xs">
      <Card withBorder w={260} p="xs" style={{ flexShrink: 0 }}>
        <Channels channels={channels.data} />
      </Card>
      <Card withBorder flex={1} p={0}>
        <Stack gap={0} h="100%">
          <Group px="md" py="sm" bg="gray.0">
            <Text fw={700}>{currentChannel ? `# ${currentChannel.name}` : ''}</Text>
            <Text c="dimmed">{t('chat.messageCount', { count: channelMessages.length })}</Text>
          </Group>
          <Messages messages={channelMessages} />
          <MessageForm onSend={sendMessage.mutateAsync} disabled={sendMessage.isPending} />
        </Stack>
      </Card>
    </Flex>
  );
};

export default ChatPage;
