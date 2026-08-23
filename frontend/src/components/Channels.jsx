import {
  ActionIcon,
  Button,
  Group,
  Menu,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';

import clean from '../lib/profanity.js';
import useUiStore from '../store/uiStore.js';

const Channels = ({ channels }) => {
  const { t } = useTranslation();
  const currentChannelId = useUiStore((state) => state.currentChannelId);
  const setCurrentChannel = useUiStore((state) => state.setCurrentChannel);
  const openModal = useUiStore((state) => state.openModal);

  return (
    <Stack gap="xs" h="100%">
      <Group justify="space-between" px="xs" wrap="nowrap">
        <Text fw={700}>{t('channels.title')}</Text>
        <ActionIcon
          variant="subtle"
          aria-label={t('channels.add')}
          onClick={() => openModal('add')}
        >
          +
        </ActionIcon>
      </Group>
      <ScrollArea flex={1}>
        <Stack gap={4}>
          {channels.map((channel) => {
            const active = channel.id === currentChannelId;
            const label = `# ${clean(channel.name)}`;

            return (
              <Group key={channel.id} gap={0} wrap="nowrap">
                <Button
                  variant={active ? 'filled' : 'subtle'}
                  justify="flex-start"
                  flex={1}
                  miw={0}
                  onClick={() => setCurrentChannel(channel.id)}
                  styles={{ label: { overflow: 'hidden', textOverflow: 'ellipsis' } }}
                >
                  {label}
                </Button>
                {channel.removable && (
                  <Menu position="bottom-end">
                    <Menu.Target>
                      <ActionIcon
                        variant={active ? 'filled' : 'subtle'}
                        aria-label={t('channels.manage')}
                      >
                        ⋮
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item onClick={() => openModal('rename', channel.id)}>
                        {t('buttons.rename')}
                      </Menu.Item>
                      <Menu.Item color="red" onClick={() => openModal('remove', channel.id)}>
                        {t('buttons.remove')}
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                )}
              </Group>
            );
          })}
        </Stack>
      </ScrollArea>
    </Stack>
  );
};

export default Channels;
