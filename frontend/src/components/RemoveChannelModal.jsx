import { Alert, Button, Group, Modal, Stack, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

const RemoveChannelModal = ({
  opened,
  onConfirm,
  onClose,
  pending,
  error,
}) => {
  const { t } = useTranslation();

  return (
    <Modal opened={opened} onClose={onClose} title={t('channels.remove')} centered>
      <Stack>
        <Text>{t('channels.removeConfirm')}</Text>
        {error && <Alert color="red">{t('errors.network')}</Alert>}
        <Group justify="flex-end">
          <Button variant="default" onClick={onClose} disabled={pending}>
            {t('buttons.cancel')}
          </Button>
          <Button color="red" onClick={onConfirm} loading={pending}>
            {t('buttons.remove')}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default RemoveChannelModal;
