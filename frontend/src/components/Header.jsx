import { Anchor, Button, Group } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuthStore } from '../contexts/appContext.js';
import { appRoutes } from '../routes.js';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const logOut = useAuthStore((state) => state.logOut);

  const handleLogOut = () => {
    logOut();
    navigate(appRoutes.login);
  };

  return (
    <Group justify="space-between" px="md" py="sm" bg="gray.1" wrap="nowrap">
      <Anchor component={Link} to={appRoutes.chat} fw={700} c="dark">
        {t('app.name')}
      </Anchor>
      {token && (
        <Button variant="default" onClick={handleLogOut}>
          {t('auth.logOut')}
        </Button>
      )}
    </Group>
  );
};

export default Header;
