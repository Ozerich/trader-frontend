import React from 'react';
import styled from "styled-components";
import {formatPrice} from "../../../../formatter.ts";

type Props = {
    ask: number;
    bid: number;
    basePrice?: number;
}

const calculatePercent = (ask: number, basePrice: number): number => {
    const delta = Math.abs(ask - basePrice);

    const percent = delta / basePrice * 100;
    const percentRounded = Math.round(percent * 100) / 100;

    return ask < basePrice ? -percentRounded : percentRounded;
}

const PriceView: React.FC<Props> = ({ask, bid, basePrice}) => {
    const percent = basePrice && ask ? calculatePercent(ask, basePrice) : 0;

    return (
        <Component $color={basePrice ? (basePrice > ask ? 'red' : (basePrice < ask ? 'green' : '')) : ''}>
            {bid && ask && <span>{formatPrice(bid)} - {formatPrice(ask)}</span>}
            {percent !== 0 ? <Percent>{percent > 0 ? '+' : ''}{percent}%</Percent> : null}
        </Component>
    );
}

export default PriceView;

const Component = styled.div<{ $color: string }>`
    font-size: 16px;
    font-weight: bold;
    white-space: nowrap;
    color: ${props => props.$color};
    display: flex;
    align-items: center;
`;

const Percent = styled.span`
    font-size: 100%;
    display: block;
    margin-left: 10px;
`;