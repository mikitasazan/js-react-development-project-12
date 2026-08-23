import {
  Anchor,
  Button,
  Card,
  Center,
  Group,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { appRoutes } from '../routes.js';

const LoginPage = () => {
  const { t } = useTranslation();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { username: '', password: '' },
  });

  return (
    <Center mih="100vh" p="md">
      <Card withBorder shadow="sm" padding="xl" radius="md" w={400}>
        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            <Title order={2} ta="center">{t('login.title')}</Title>
            <TextInput
              label={t('login.username')}
              placeholder={t('login.username')}
              autoComplete="username"
              key={form.key('username')}
              {...form.getInputProps('username')}
            />
            <PasswordInput
              label={t('login.password')}
              placeholder={t('login.password')}
              autoComplete="current-password"
              key={form.key('password')}
              {...form.getInputProps('password')}
            />
            <Button type="submit" fullWidth>{t('login.submit')}</Button>
            <Group justify="center" gap="xs">
              {t('login.noAccount')}
              <Anchor component={Link} to={appRoutes.signup}>
                {t('login.signUp')}
              </Anchor>
            </Group>
          </Stack>
        </form>
      </Card>
    </Center>
  );
};

export default LoginPage;
