import {io} from "socket.io-client";

const SOCKET_URI = document.location.href.includes('localhost') ? 'http://localhost:3000' : 'https://trader.ozerich.com';
const SOCKET_PATH = document.location.href.includes('localhost') ? '/socket.io' : '/api/socket.io';

const socket = io(SOCKET_URI, {
    path: SOCKET_PATH
});

const subscriptions: Record<string, string> = {};

export function subscribeTicker(ticker: string): string {
    socket.emit('subscribe', ticker);

    const id = Math.random().toString();
    subscriptions[id] = ticker;
    return id;
}

export function unsubscribeTicker(id: string) {
    if (!(id in subscriptions)) {
        return;
    }

    socket.emit("unsubscribe", subscriptions[id]);
    delete subscriptions[id];

}

export default socket;