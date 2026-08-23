import axios from 'axios';

import { apiRoutes } from '../routes.js';

/**
 * Builds the whole server interface around one auth store, so a run never
 * borrows the token of the run before it.
 */
const createApi = (authStore) => {
  // Without a timeout a lost network leaves the request hanging, and the user
  // keeps looking at a spinner instead of an error.
  const client = axios.create({ timeout: 10000 });

  client.interceptors.request.use((config) => {
    const { token } = authStore.getState();

    if (token) {
      Object.assign(config.headers, { Authorization: `Bearer ${token}` });
    }

    return config;
  });

  const data = (response) => response.data;

  return {
    logIn: (credentials) => client.post(apiRoutes.login(), credentials).then(data),
    signUp: (credentials) => client.post(apiRoutes.signup(), credentials).then(data),
    getChannels: () => client.get(apiRoutes.channels()).then(data),
    getMessages: () => client.get(apiRoutes.messages()).then(data),
    createChannel: (name) => client.post(apiRoutes.channels(), { name }).then(data),
    renameChannel: ({ id, name }) => client.patch(apiRoutes.channel(id), { name }).then(data),
    removeChannel: (id) => client.delete(apiRoutes.channel(id)).then(data),
    createMessage: (message) => client.post(apiRoutes.messages(), message).then(data),
  };
};

export default createApi;
