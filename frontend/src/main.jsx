import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { io } from 'socket.io-client';

import init from './init.jsx';

const socket = io({ autoConnect: false });

createRoot(document.getElementById('root')).render(
  <StrictMode>{await init(socket)}</StrictMode>,
);
