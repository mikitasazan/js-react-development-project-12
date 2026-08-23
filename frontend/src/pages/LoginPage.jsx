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
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import client from '../api/client.js';
import useAuthStore from '../store/authStore.js';
import { apiRoutes, appRoutes } from '../routes.js';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const logIn = useAuthStore((state) => state.logIn);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { username: '', password: '' },
  });

  const login = useMutation({
    mutationFn: (values) => client.post(apiRoutes.login(), values).then((r) => r.data),
    onSuccess: (data) => {
      logIn(data);
      navigate(appRoutes.chat);
    },
    onError: (error) => {
      const message = error.response?.status === 401
        ? t('errors.wrongCredentials')
        : t('errors.network');
      form.setErrors({ username: ' ', password: message });
    },
  });

  return (
    <Center mih="100vh" p="md">
      <Card withBorder shadow="sm" padding="xl" radius="md" w={400}>
        <form onSubmit={form.onSubmit((values) => login.mutate(values))}>
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
            <Button type="submit" fullWidth loading={login.isPending}>
              {t('login.submit')}
            </Button>
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
