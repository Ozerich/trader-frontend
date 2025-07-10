export async function saxoOrder(ticker: string, quantity: number, price: number) {
    const response = await fetch("https://saxo-service.ozerich.com/order/" + ticker, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({quantity, price})
    });

    const responseRaw = await response.json();
    return responseRaw;
}