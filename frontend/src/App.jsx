import { Flex } from '@mantine/core';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import Header from './components/Header.jsx';
import ChatPage from './pages/ChatPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import useAuthStore from './store/authStore.js';
import { appRoutes } from './routes.js';

const PrivateOutlet = () => {
  const token = useAuthStore((state) => state.token);
  return token ? <Outlet /> : <Navigate to={appRoutes.login} replace />;
};

const App = () => (
  <Flex direction="column" h="100vh">
    <Header />
    <Routes>
      <Route element={<PrivateOutlet />}>
        <Route path={appRoutes.chat} element={<ChatPage />} />
      </Route>
      <Route path={appRoutes.login} element={<LoginPage />} />
      <Route path={appRoutes.signup} element={<SignupPage />} />
      <Route path={appRoutes.notFound} element={<NotFoundPage />} />
    </Routes>
  </Flex>
);

export default App;
