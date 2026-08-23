import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import ChannelNameModal from './ChannelNameModal.jsx';
import RemoveChannelModal from './RemoveChannelModal.jsx';
import useUiStore from '../store/uiStore.js';
import { createChannel, removeChannel, renameChannel } from '../api/chat.js';

const ChannelModals = ({ channels }) => {
  const { t } = useTranslation();
  const modal = useUiStore((state) => state.modal);
  const closeModal = useUiStore((state) => state.closeModal);
  const setCurrentChannel = useUiStore((state) => state.setCurrentChannel);

  const target = channels.find((c) => c.id === modal.channelId);
  const takenNames = channels.map((c) => c.name);

  const notify = (message) => notifications.show({ message, color: 'green' });

  const add = useMutation({
    mutationFn: createChannel,
    onSuccess: (channel) => {
      setCurrentChannel(channel.id);
      notify(t('notify.channelCreated'));
    },
  });
  const rename = useMutation({
    mutationFn: renameChannel,
    onSuccess: () => notify(t('notify.channelRenamed')),
  });

  const remove = useMutation({
    mutationFn: removeChannel,
    onSuccess: () => {
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
