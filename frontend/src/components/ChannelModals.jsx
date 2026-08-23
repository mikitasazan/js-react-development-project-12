import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import ChannelNameModal from './ChannelNameModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';
import { useApi, useUiStore } from '../contexts/appContext.js';

const ChannelModals = ({ channels }) => {
  const { t } = useTranslation();
  const api = useApi();
  const modal = useUiStore((state) => state.modal);
  const closeModal = useUiStore((state) => state.closeModal);
  const setCurrentChannel = useUiStore((state) => state.setCurrentChannel);
  const currentChannelId = useUiStore((state) => state.currentChannelId);
  const resetCurrentChannel = useUiStore((state) => state.resetCurrentChannel);

  const target = channels.find((c) => c.id === modal.channelId);
  const takenNames = channels.map((c) => c.name);

  const notify = (message) => notifications.show({ message, color: 'green' });

  const add = useMutation({
    mutationFn: api.createChannel,
    onSuccess: (channel) => {
      setCurrentChannel(channel.id);
      notify(t('notify.channelCreated'));
    },
  });
  const rename = useMutation({
    mutationFn: api.renameChannel,
    onSuccess: () => notify(t('notify.channelRenamed')),
  });

  const remove = useMutation({
    mutationFn: api.removeChannel,
    // Normally the server's own removeChannel socket event does this; this
    // covers the case where that event never reaches back to us.
    onSuccess: () => {
      if (modal.channelId === currentChannelId) {
        resetCurrentChannel();
      }
      closeModal();
      notify(t('notify.channelRemoved'));
    },
  });

  return (
    <>
      <ChannelNameModal
        opened={modal.type === 'add'}
        title={t('channels.add')}
        initialName=""
        takenNames={takenNames}
        submitLabel={t('buttons.send')}
        pending={add.isPending}
        onSubmit={(name) => add.mutateAsync(name)}
        onClose={closeModal}
      />
      <ChannelNameModal
        key={target?.id}
        opened={modal.type === 'rename'}
        title={t('channels.rename')}
        initialName={target?.name ?? ''}
        takenNames={takenNames.filter((name) => name !== target?.name)}
        submitLabel={t('buttons.send')}
        pending={rename.isPending}
        onSubmit={(name) => rename.mutateAsync({ id: modal.channelId, name })}
        onClose={closeModal}
      />
      <RemoveChannelModal
        opened={modal.type === 'remove'}
        pending={remove.isPending}
        error={remove.isError}
        onConfirm={() => remove.mutate(modal.channelId)}
        onClose={() => { remove.reset(); closeModal(); }}
      />
    </>
  );
};

export default ChannelModals;
