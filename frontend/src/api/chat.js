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

export const createChannel = (name) => client
  .post(apiRoutes.channels(), { name })
  .then((r) => r.data);

export const renameChannel = ({ id, name }) => client
  .patch(apiRoutes.channel(id), { name })
  .then((r) => r.data);

export const removeChannel = (id) => client
  .delete(apiRoutes.channel(id))
  .then((r) => r.data);

export const createMessage = (message) => client
  .post(apiRoutes.messages(), message)
  .then((r) => r.data);
