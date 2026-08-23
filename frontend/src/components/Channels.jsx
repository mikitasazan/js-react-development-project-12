import { Button, ScrollArea, Stack, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import useUiStore from '../store/uiStore.js';

const Channels = ({ channels }) => {
  const { t } = useTranslation();
  const currentChannelId = useUiStore((state) => state.currentChannelId);
  const setCurrentChannel = useUiStore((state) => state.setCurrentChannel);

  return (
    <Stack gap="xs" h="100%">
      <Text fw={700} px="xs">{t('chat.channels')}</Text>
      <ScrollArea flex={1}>
        <Stack gap={4}>
          {channels.map((channel) => (
            <Button
              key={channel.id}
              variant={channel.id === currentChannelId ? 'filled' : 'subtle'}
              justify="flex-start"
              fullWidth
              onClick={() => setCurrentChannel(channel.id)}
            >
              {`# ${channel.name}`}
            </Button>
          ))}
        </Stack>
      </ScrollArea>
    </Stack>
  );
};

export default Channels;
