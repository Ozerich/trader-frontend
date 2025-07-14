import type {NewsEventActivity} from "../types.ts";

const BACKEND_BASE_URL = document.location.href.includes('localhost') ? "http://localhost:3000" : "/api";


export async function tickerInfo(ticker: string): Promise<{
    name: string,
    marketCap: number,
    sharesQuantity: number
}> {
    const response = await fetch(BACKEND_BASE_URL + '/tickers/' + ticker, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        },
    });

    const responseRaw = await response.json();

    if (response.status !== 200) {
        throw new Error(responseRaw.error);
    }

    return responseRaw;
}

export async function fetchPrice(ticker: string): Promise<{
    price: {
        ask: number,
        bid: number,
        base: number
    },
    activity: NewsEventActivity
}> {
    const response = await fetch(BACKEND_BASE_URL + '/tickers/' + ticker + '/price', {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        },
    });

    const responseRaw = await response.json();

    if (response.status !== 200) {
        throw new Error(responseRaw.error);
    }

    return responseRaw;
}


export async function fetchPreMktVolume(ticker: string): Promise<number> {
    const response = await fetch(BACKEND_BASE_URL + '/tickers/' + ticker + '/premarket-volume', {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        },
    });

    const responseRaw = await response.json();

    if (response.status !== 200) {
        throw new Error(responseRaw.error);
    }

    return responseRaw.result;
}