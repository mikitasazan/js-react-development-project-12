import { Button, Group, Modal, Stack, TextInput } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';

/** Shared body of the add-channel and rename-channel dialogs. */
const ChannelNameModal = ({
  opened,
  title,
  initialName,
  takenNames,
  submitLabel,
  onSubmit,
  onClose,
  pending,
}) => {
  const { t } = useTranslation();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: initialName },
    validate: {
      name: (value) => {
        const name = value.trim();
        const lengthError = hasLength({ min: 3, max: 20 }, t('errors.channelLength'))(name);

        if (lengthError) {
          return lengthError;
        }

        return takenNames.includes(name) ? t('errors.channelExists') : null;
      },
    },
  });

  const handleSubmit = async ({ name }) => {
    try {
      await onSubmit(name.trim());
      onClose();
    } catch {
      form.setFieldError('name', t('errors.network'));
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title={title} centered>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            data-autofocus
            label={t('channels.name')}
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <Group justify="flex-end">
            <Button variant="default" onClick={onClose} disabled={pending}>
              {t('buttons.cancel')}
            </Button>
            <Button type="submit" loading={pending}>{submitLabel}</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default ChannelNameModal;
