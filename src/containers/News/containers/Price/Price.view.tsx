import React from 'react';
import styled from "styled-components";

type Props = {
    ask: number;
    bid: number;
    basePrice?: number;
}

const calculatePercent = (ask: number, basePrice: number): number => {
    const delta = Math.abs(ask - basePrice);

    const percent = delta / ask * 100;
    const percentRounded = Math.round(percent * 100) / 100;

    return percentRounded < 0 ? -percentRounded : percentRounded;
}

const PriceView: React.FC<Props> = ({ask, bid, basePrice}) => {
    const percent = basePrice && ask ? calculatePercent(ask, basePrice) : 0;

    return (
        <Component>
            {bid && ask && <span>{bid}..{ask}</span>}

            {percent !== 0 ? <Percent>{percent > 0 ? '+' : ''}{percent}%</Percent> : null}
        </Component>
    );
}

export default PriceView;

const Component = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: green;
    display: flex;
    align-items: center;
`;

const Percent = styled.span`
    font-size: 120%;
    display: block;
    margin-left: 5px;
`;