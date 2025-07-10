import React from 'react';
import styled from "styled-components";
import {usePrices} from "../../../contexts/price.context.tsx";
import {saxoOrder} from "../../../services/saxo.ts";

type Props = {
    ticker: string;
    total: number;
    basePrice: number;
}

const KOEFFICIENT = 1.05;

const SaxoAction: React.FC<Props> = ({total, ticker, basePrice}) => {
    const {state: prices} = usePrices();


    const askPrice = ticker in prices ? prices[ticker].a : basePrice;
    const price = Math.round(askPrice * KOEFFICIENT * 100) / 100;

    const quantity = Math.floor(total / askPrice);

    const onClick = async () => {
        const response = await saxoOrder(ticker, quantity, price);
        alert('Ордер выставлен: ' + response.orderId);
    }

    return (
        <Component onClick={onClick}>
            {total} $
        </Component>
    );
}

export default SaxoAction;

const Component = styled.button`
    cursor: pointer;
    text-decoration: none;
    border: 1px solid #aaa;
    padding: 5px 10px;
    background: #eee;
    color: #000;
    font-weight: bold;
`;