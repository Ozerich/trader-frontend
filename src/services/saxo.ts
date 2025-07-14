export async function saxoOrder(ticker: string, total: number) {


    const response = await fetch("https://saxo-service.ozerich.com/order/" + ticker, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({total})
    });

    const responseRaw = await response.json();

    if (response.status !== 200) {
        throw new Error(responseRaw.error);
    }

    return responseRaw;

}