import { io } from 'socket.io-client';

const SOCKET_URL = 'http://10.37.247.200:3000';

export const socket = io(SOCKET_URL, {
  autoConnect: false, 
});