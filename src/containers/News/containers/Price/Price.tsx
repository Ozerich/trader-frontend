import React, {useEffect, useRef, useState} from 'react';
import PriceView from "./Price.view.tsx";
import socket, {subscribeTicker, unsubscribeTicker} from "../../../../socket.ts";
import styled from "styled-components";

type Props = {
    ticker: string;
    high?: number | null;
    basePrice?: number;
    defaultAsk?: number;
    defaultBid?: number;
    liveUpdate: boolean;
}

type PriceUpdateMessage = {
    a: number,
    b: number
}

const Price: React.FC<Props> = ({ticker, basePrice, defaultAsk, defaultBid, liveUpdate, high}) => {
    const listenerId = useRef<string>('');

    const [ask, setAsk] = useState<number | undefined>();
    const [bid, setBid] = useState<number | undefined>();
    const [history, setHistory] = useState<number[]>([]);

    const priceUpdate = (data: PriceUpdateMessage) => {
        setAsk(data.a);
        setBid(data.b);

        setHistory(history => history.length === 0 || history[0] !== data.a ? [data.a, ...history.slice(0, 9)] : history);
    }

    useEffect(() => {
        if (liveUpdate) {
            listenerId.current = subscribeTicker(ticker);
            socket.on("price_update:" + ticker, priceUpdate);
        } else {
            if (listenerId.current) unsubscribeTicker(ticker, listenerId.current);
            socket.off('price_update:' + ticker, priceUpdate);
        }
    }, [liveUpdate, ticker]);

    useEffect(() => {
        return () => {
            if (listenerId.current) unsubscribeTicker(ticker, listenerId.current);
            socket.off('price_update:' + ticker, priceUpdate);
        }
    }, []);

    useEffect(() => {
        if (!ask) {
            setAsk(defaultAsk);
        }
        if (!bid) {
            setBid(defaultBid);
        }
    }, [defaultAsk, defaultBid]);

    let error: string | null = null;
    if (high && ask && ask < high) {
        error = 'Lower than high';
    } else if (ask && basePrice && ask > basePrice && ask / basePrice > 1.3) {
        error = 'Higher than 30%';
    }

    return (
        <PriceWrapper>
            <PriceRow>
                {ask && bid && <PriceView ask={ask} bid={bid} basePrice={basePrice}/>}
                {error && <PriceError>{error}</PriceError>}
            </PriceRow>

            <History>
                {history.map((item, index) => <>
                    <span
                        className={index < history.length - 1 ? (item > history[index + 1] ? 'positive' : 'negative') : ''}>{item}</span>
                    {index < history.length - 1 && <i>←</i>}
                </>)}
            </History>
        </PriceWrapper>
    );
}

export default Price;

const PriceWrapper = styled.div`
    min-height: 23px;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const PriceRow = styled.div`
    display: flex;
    gap: 20px;
`;

const PriceError = styled.span`
    background: red;
    color: #fff;
    border-radius: 0px;
    padding: 2px 5px;
    text-align: center;
    align-items: center;
    display: flex;
    font-size: 10px;
`;

const History = styled.div`
    display: flex;
    align-items: center;
    gap: 3px;

    span {
        font-size: 12px;

        &.positive {
            color: green;
        }

        &.negative {
            color: red;
        }
    }

    i {
        font-size: 8px;
        transform: translateY(-2px);
    }
`;