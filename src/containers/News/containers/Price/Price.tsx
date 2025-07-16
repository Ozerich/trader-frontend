import React, {useEffect, useRef, useState} from 'react';
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
    const ref = useRef<HTMLDivElement>(null);

    const [ask, setAsk] = useState<number | undefined>();
    const [bid, setBid] = useState<number | undefined>();

    const previousAskRef = useRef<number | undefined>(undefined);

    const priceUpdate = (data: PriceUpdateMessage) => {
        const previousAsk = previousAskRef.current;

        const direction = previousAsk ? (data.a > previousAsk ? 'up' : (data.a < previousAsk ? 'down' : '')) : '';

        if (ref.current) {
            const newsContainer = ref.current.closest('.news-card');
            if (newsContainer) {
                newsContainer.classList.toggle('news-card--up', direction === 'up');
                newsContainer.classList.toggle('news-card--down', direction === 'down');
            }
        }

        previousAskRef.current = data.a;

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

    useEffect(() => {

    }, [ref]);

    return (
        <PriceWrapper ref={ref}>
            {ask && bid && <PriceView ask={ask} bid={bid} basePrice={basePrice}/>}
        </PriceWrapper>
    );
}

export default Price;

const PriceWrapper = styled.div`
    min-height: 23px;
`;