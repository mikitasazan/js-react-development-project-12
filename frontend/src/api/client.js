import axios from 'axios';

import { getAuthHeader } from '../store/authStore.js';

// Without a timeout a lost network leaves the request hanging, and the user
// keeps looking at a spinner instead of an error.
const client = axios.create({ timeout: 10000 });

client.interceptors.request.use((config) => {
  Object.assign(config.headers, getAuthHeader());
  return config;
});

export default client;
