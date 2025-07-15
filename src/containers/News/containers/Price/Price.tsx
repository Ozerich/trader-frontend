import React, {useEffect, useState} from 'react';
import PriceView from "./Price.view.tsx";
import socket from "../../../../socket.ts";
import styled from "styled-components";

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
    const [ask, setAsk] = useState<number | undefined>();
    const [bid, setBid] = useState<number | undefined>();

    const priceUpdate = (data: PriceUpdateMessage) => {
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

    useEffect(() => {
        if (!ask) {
            setAsk(defaultAsk);
        }
        if (!bid) {
            setBid(defaultBid);
        }
    }, [defaultAsk, defaultBid]);


    if (!ask || !bid) {
        return <PriceWrapper/>;
    }

    return (
        <PriceWrapper>
            <PriceView ask={ask} bid={bid} basePrice={basePrice}/>
        </PriceWrapper>
    );
}

export default Price;

const PriceWrapper = styled.div`
    min-height: 23px;
`;