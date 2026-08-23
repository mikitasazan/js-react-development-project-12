import {
  Button,
  Card,
  Center,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { hasLength, isNotEmpty, matchesField, useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useApi, useAuthStore } from '../contexts/appContext.js';
import { appRoutes } from '../routes.js';

const SignupPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const api = useApi();
  const logIn = useAuthStore((state) => state.logIn);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { username: '', password: '', confirmPassword: '' },
    validate: {
      username: (value) => isNotEmpty(t('errors.required'))(value)
        || hasLength({ min: 3, max: 20 }, t('errors.length3to20'))(value),
      password: (value) => isNotEmpty(t('errors.required'))(value)
        || hasLength({ min: 6 }, t('errors.passwordLength'))(value),
      confirmPassword: matchesField('password', t('errors.passwordsDiffer')),
    },
  });

  const signUp = useMutation({
    mutationFn: ({ username, password }) => api.signUp({ username, password }),
    onSuccess: (data) => {
      logIn(data);
      navigate(appRoutes.chat);
    },
    onError: (error) => {
      const message = error.response?.status === 409
        ? t('errors.userExists')
        : t('errors.network');
      form.setFieldError('username', message);
    },
  });

  return (
    <Center flex={1} p="md">
      <Card withBorder shadow="sm" padding="xl" radius="md" w={400}>
        <form onSubmit={form.onSubmit((values) => signUp.mutate(values))}>
          <Stack>
            <Title order={2} ta="center">{t('signup.title')}</Title>
            <TextInput
              label={t('signup.username')}
              autoComplete="username"
              key={form.key('username')}
              {...form.getInputProps('username')}
            />
            <PasswordInput
              label={t('signup.password')}
              autoComplete="new-password"
              key={form.key('password')}
              {...form.getInputProps('password')}
            />
            <PasswordInput
              label={t('signup.confirmPassword')}
              autoComplete="new-password"
              key={form.key('confirmPassword')}
              {...form.getInputProps('confirmPassword')}
            />
            <Button type="submit" fullWidth loading={signUp.isPending}>
              {t('signup.submit')}
            </Button>
          </Stack>
        </form>
      </Card>
    </Center>
  );
};

export default SignupPage;
