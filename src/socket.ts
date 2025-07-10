import {io} from "socket.io-client";

/*const socket = io("https://trader.ozerich.com", {
    path: "/api/socket.io",
});*/

const socket = io("http://localhost:3000", {
    path: "/socket.io",
});

export default socket;