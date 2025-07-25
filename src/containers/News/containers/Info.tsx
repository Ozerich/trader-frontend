import React from 'react';
import styled from "styled-components";
import {formatNumber, formatPrice} from "../../../formatter.ts";

type Props = {
    basePrice?: number;
    volume?: number;
    liveVolume?: number;
    high?: number | null;
}

const Info: React.FC<Props> = ({basePrice, volume, high, liveVolume}) => {
    return (
        <Component>
            <Param>
                <ParamLabel>Base:</ParamLabel>
                <ParamValue>{formatPrice(basePrice)}</ParamValue>
            </Param>
            <Param>
                <ParamLabel>High:</ParamLabel>
                <ParamValue>{formatNumber(high)}</ParamValue>
            </Param>
            <Param>
                <ParamLabel>Volume:</ParamLabel>
                <ParamValue>{formatNumber(volume)}</ParamValue>
            </Param>
            <Param>
                <ParamLabel>Live:</ParamLabel>
                <ParamValue>{formatNumber(liveVolume)}</ParamValue>
            </Param>
        </Component>
    );
}

export default Info;

const Component = styled.div`
    display: flex;
    gap: 20px;
`;

const Param = styled.div`
    font-size: 12px;
    display: flex;
    flex-direction: column;
`;

const ParamValue = styled.span`
    font-weight: bold;
    text-align: left;
`;

const ParamLabel = styled.span`
    display: block;
`;
