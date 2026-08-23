import { ActionIcon, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';

const MessageForm = ({ onSend, disabled }) => {
  const { t } = useTranslation();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { body: '' },
  });

  const handleSubmit = async ({ body }) => {
    if (!body.trim()) {
      return;
    }

    await onSend(body);
    form.reset();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Group gap="xs" p="md" wrap="nowrap">
        <TextInput
          flex={1}
          placeholder={t('chat.newMessage')}
          aria-label={t('chat.newMessage')}
          disabled={disabled}
          key={form.key('body')}
          {...form.getInputProps('body')}
        />
        <ActionIcon type="submit" size="lg" disabled={disabled} aria-label={t('chat.send')}>
          →
        </ActionIcon>
      </Group>
    </form>
  );
};

export default MessageForm;
