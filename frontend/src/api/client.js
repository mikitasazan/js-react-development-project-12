import axios from 'axios';

import { getAuthHeader } from '../store/authStore.js';

const client = axios.create();

client.interceptors.request.use((config) => {
  Object.assign(config.headers, getAuthHeader());
  return config;
});

export default client;
