import {io} from "socket.io-client";

const SOCKET_URI = document.location.href.includes('localhost') ? 'http://localhost:3000' : 'https://trader.ozerich.com';
const SOCKET_PATH = document.location.href.includes('localhost') ? '/socket.io' : '/api/socket.io';

const socket = io(SOCKET_URI, {
    path: SOCKET_PATH
});

export default socket;