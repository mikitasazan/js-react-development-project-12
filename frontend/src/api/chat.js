import client from './client.js';
import { apiRoutes } from '../routes.js';

export const channelsQuery = {
  queryKey: ['channels'],
  queryFn: () => client.get(apiRoutes.channels()).then((r) => r.data),
};

export const messagesQuery = {
  queryKey: ['messages'],
  queryFn: () => client.get(apiRoutes.messages()).then((r) => r.data),
};
