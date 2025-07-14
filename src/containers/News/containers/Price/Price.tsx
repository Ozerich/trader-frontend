import React from 'react';
import PriceView from "./Price.view.tsx";

type Props = {
    ticker: string;
    basePrice?: number;
    defaultAsk?: number;
    defaultBid?: number;
}

const Price: React.FC<Props> = ({ticker, basePrice, defaultAsk, defaultBid}) => {

    const ask = defaultAsk;
    const bid = defaultBid;

    if (!ask || !bid) {
        return null;
    }

    return (
        <PriceView ask={ask} bid={bid} basePrice={basePrice}/>
    );
}

export default Price;
