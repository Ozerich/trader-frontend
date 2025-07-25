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
    ask: number,
    bid: number
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

export async function fetchBasePrice(ticker: string): Promise<{
    price: number;
}> {
    const response = await fetch(BACKEND_BASE_URL + '/tickers/' + ticker + '/base-price', {
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


export async function fetchStats(ticker: string): Promise<{ volume: number, high: number | null }> {
    const response = await fetch(BACKEND_BASE_URL + '/tickers/' + ticker + '/stats', {
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

export async function fetchLive(ticker: string, seconds: number): Promise<{
    volume: number,
    direction: 'up' | 'down' | 'neutral'
}> {
    const response = await fetch(BACKEND_BASE_URL + '/tickers/' + ticker + '/live?seconds=' + seconds, {
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