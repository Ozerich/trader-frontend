import {io} from "socket.io-client";

const SOCKET_URI = document.location.href.includes('localhost') ? 'http://localhost:3000' : 'https://trader.ozerich.com';
const SOCKET_PATH = document.location.href.includes('localhost') ? '/socket.io' : '/api/socket.io';

const socket = io(SOCKET_URI, {
    path: SOCKET_PATH
});

const subscriptions: Record<string, Array<string>> = {};

export function subscribeTicker(ticker: string): string {
    if (!(ticker in subscriptions)) {
        subscriptions[ticker] = [];

        socket.emit('subscribe', ticker);
        console.log(`📡 Subscribe to ${ticker}`);
    }

    const id = Math.random().toString();
    subscriptions[ticker].push(id);

    return id;
}

export function unsubscribeTicker(ticker: string, id: string) {
    if (!(ticker in subscriptions)) {
        return;
    }

    const found = subscriptions[ticker].includes(id);
    if (!found) {
        return;
    }

    subscriptions[ticker] = subscriptions[ticker].filter(item => item !== id);

    if (subscriptions[ticker].length === 0) {
        socket.emit("unsubscribe", subscriptions[id]);
        console.log(`❌ Unsubscribe ${ticker}`);

        delete subscriptions[ticker];
    }

}

export default socket;