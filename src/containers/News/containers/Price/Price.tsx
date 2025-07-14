import React, {useEffect, useState} from 'react';
import PriceView from "./Price.view.tsx";
import socket from "../../../../socket.ts";

type Props = {
    ticker: string;
    basePrice?: number;
    defaultAsk?: number;
    defaultBid?: number;
}

type PriceUpdateMessage = {
    a: number,
    b: number
}

const Price: React.FC<Props> = ({ticker, basePrice, defaultAsk, defaultBid}) => {
    const [ask, setAsk] = useState<number | undefined>(defaultAsk);
    const [bid, setBid] = useState<number | undefined>(defaultBid);

    const priceUpdate = (data: PriceUpdateMessage) => {
        console.log('priceUpdate', ticker, data);
        setAsk(data.a);
        setBid(data.b);
    }

    useEffect(() => {
        socket.emit('subscribe', ticker);

        socket.on("price_update:" + ticker, priceUpdate);

        return () => {
            socket.off('price_update:' + ticker, priceUpdate);
            socket.emit("unsubscribe", ticker);
        };
    }, [ticker]);

    if (!ask || !bid) {
        return null;
    }

    return (
        <PriceView ask={ask} bid={bid} basePrice={basePrice}/>
    );
}

export default Price;
