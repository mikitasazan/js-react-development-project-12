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
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import Channels from '../components/Channels.jsx';
import MessageForm from '../components/MessageForm.jsx';
import Messages from '../components/Messages.jsx';
import useUiStore from '../store/uiStore.js';
import { channelsQuery, messagesQuery } from '../api/chat.js';

const ChatPage = () => {
  const { t } = useTranslation();
  const currentChannelId = useUiStore((state) => state.currentChannelId);

  const channels = useQuery(channelsQuery);
  const messages = useQuery(messagesQuery);

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
          <MessageForm onSend={() => {}} />
        </Stack>
      </Card>
    </Flex>
  );
};

export default ChatPage;
