import {io} from "socket.io-client";

// Укажи свой адрес сервера
const socket = io("https://trader.ozerich.com/api");

export default socket;