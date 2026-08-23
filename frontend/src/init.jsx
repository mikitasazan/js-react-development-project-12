import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import createApi from './api/createApi.js';
import createAuthStore from './store/createAuthStore.js';
import createUiStore from './store/createUiStore.js';
import initI18n from './i18n/index.js';
import { AppContext } from './contexts/appContext.js';

/**
 * Builds one run of the application. Everything that holds state is made
 * here, so two runs in the same browser never share anything.
 */
const init = async (socket) => {
  const i18n = await initI18n();
  const authStore = createAuthStore();
  const uiStore = createUiStore();
  const api = createApi(authStore);

  // networkMode 'always' matters: on the default 'online' a lost network puts
  // requests on pause instead of failing them, and the user is left watching a
  // spinner with no error.
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: 1, refetchOnWindowFocus: false, networkMode: 'always' },
      mutations: { networkMode: 'always' },
    },
  });

  return (
    <AppContext.Provider value={{ authStore, uiStore, api, socket }}>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <MantineProvider defaultColorScheme="auto">
            <ModalsProvider>
              <Notifications position="top-right" />
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ModalsProvider>
          </MantineProvider>
        </QueryClientProvider>
      </I18nextProvider>
    </AppContext.Provider>
  );
};

export default init;
