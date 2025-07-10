import React from 'react';
import styled from "styled-components";
import {usePrices} from "../contexts/price.context.tsx";

type Props = {
    ticker: string;
    defaultBid: number;
    defaultAsk: number;
    basePrice: number;
}

function to2(value: number): string {
    return (Math.round(value * 100) / 100).toFixed(2);
}

export function getDeltaPercent(oldPrice: number, currentPrice: number): number {
    if (currentPrice > oldPrice) {
        return (currentPrice / oldPrice - 1) * 100;
    }

    if (currentPrice < oldPrice) {
        return -(oldPrice / currentPrice - 1) * 100;
    }

    return 0;
}

function formatDeltaPercent(percent: number): string {
    if (percent === 0) {
        return '0.0%';
    }

    if (percent > 0) {
        return '+' + to2(percent) + '%';
    }

    if (percent < 0) {
        return to2(percent) + '%';
    }

    return '';
}

const Price: React.FC<Props> = ({ticker, defaultAsk, defaultBid, basePrice}) => {
    const {state: prices} = usePrices();

    const askPrice = ticker in prices ? prices[ticker].a : defaultAsk;
    const bidPrice = ticker in prices ? prices[ticker].b : defaultBid;

    const deltaPercent = getDeltaPercent(basePrice, askPrice);

    return (
        <Component $mode={deltaPercent > 0 ? 'positive' : (deltaPercent < 0 ? 'negative' : '')}>
            <PriceValue>
                {bidPrice.toFixed(2)}..{askPrice.toFixed(2)}
            </PriceValue>
            <Percent>{formatDeltaPercent(deltaPercent)}</Percent>
        </Component>
    );
}

export default Price;

const Component = styled.div<{ $mode: string }>`
    font-size: 24px;

    color: ${props => props.$mode === 'positive' ? 'green' : (props.$mode === 'negative' ? 'red' : '')};
    display: flex;
    gap: 5px;
`;

const Percent = styled.span`

    font-weight: bold;
`;

const PriceValue = styled.span`
`;