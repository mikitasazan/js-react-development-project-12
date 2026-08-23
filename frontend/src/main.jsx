import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import initI18n from './i18n/index.js';

// networkMode 'always' matters: on the default 'online' a lost network puts
// requests on pause instead of failing them, and the user is left watching a
// spinner with no error.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false, networkMode: 'always' },
    mutations: { networkMode: 'always' },
  },
});

const start = async () => {
  const i18n = await initI18n();

  createRoot(document.getElementById('root')).render(
    <StrictMode>
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
    </StrictMode>,
  );
};

start();
