import React from 'react';
import styled from "styled-components";
import {usePrices} from "../contexts/price.context.tsx";

type Props = {
    ticker: string;
}

const Price: React.FC<Props> = ({ticker}) => {
    const {state: prices} = usePrices();

    if (!(ticker in prices)) {
        return null;
    }

    console.log(prices);
    return (
        <Component>
            {prices[ticker].a}..{prices[ticker].b}
        </Component>
    );
}

export default Price;

const Component = styled.div`

`;