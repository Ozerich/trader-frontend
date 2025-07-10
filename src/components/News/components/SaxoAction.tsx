import React from 'react';
import styled from "styled-components";
import {usePrices} from "../../../contexts/price.context.tsx";

type Props = {
    ticker: string;
    total: number;
    basePrice: number;
}
const SaxoAction: React.FC<Props> = ({total, ticker, basePrice}) => {
    const {state: prices} = usePrices();

    const askPrice = ticker in prices ? prices[ticker].a : basePrice;
    const price = Math.round(askPrice * 1.05 * 100) / 100;

    const quantity = Math.floor(total / askPrice);

    const url = `https://saxo-service.ozerich.com/order/${ticker}/quantity=${quantity}&price=${price}`

    return (
        <Component href={url}
                   target="_blank">
            {total} $
        </Component>
    );
}

export default SaxoAction;

const Component = styled.a`
    cursor: pointer;
    text-decoration: none;
    border: 1px solid #aaa;
    padding: 5px 10px;
    background: #eee;
    color: #000;
    font-weight: bold;
`;