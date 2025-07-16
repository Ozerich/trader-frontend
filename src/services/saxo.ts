export async function saxoOrder(ticker: string, total: number, maxPrice: number) {

    const response = await fetch("https://saxo-service.ozerich.com/order/" + ticker, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({total, maxPrice})
    });

    const responseRaw = await response.json();

    if (response.status !== 200) {
        throw new Error(responseRaw.error);
    }

    return responseRaw;

}

export async function tigerOrder(ticker: string, total: number, maxPrice: number) {

    const response = await fetch("https://tiger-service.ozerich.com/order/" + ticker, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({total, maxPrice})
    });

    const responseRaw = await response.json();

    if (response.status !== 200) {
        throw new Error(responseRaw.error);
    }

    return responseRaw;

}