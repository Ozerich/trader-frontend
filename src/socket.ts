import {io} from "socket.io-client";

// Укажи свой адрес сервера
const socket = io("http://localhost:3000");

export default socket;