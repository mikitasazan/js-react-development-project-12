import { Anchor, Container, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { appRoutes } from '../routes.js';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Container py="xl" ta="center">
      <Title order={1}>404</Title>
      <Text mt="sm">{t('notFound.title')}</Text>
      <Anchor component={Link} to={appRoutes.chat} mt="md" display="inline-block">
        {t('notFound.goHome')}
      </Anchor>
    </Container>
  );
};

export default NotFoundPage;
