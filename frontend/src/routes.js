const apiPrefix = '/api/v1';

export const appRoutes = {
  chat: '/',
  login: '/login',
  signup: '/signup',
  notFound: '*',
};

export const apiRoutes = {
  login: () => `${apiPrefix}/login`,
  signup: () => `${apiPrefix}/signup`,
  channels: () => `${apiPrefix}/channels`,
  channel: (id) => `${apiPrefix}/channels/${id}`,
  messages: () => `${apiPrefix}/messages`,
  message: (id) => `${apiPrefix}/messages/${id}`,
};
