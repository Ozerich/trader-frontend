import React from 'react';
import styled from "styled-components";
import {formatNumber, formatPrice} from "../../../formatter.ts";

type Props = {
    basePrice?: number;
    sharesQuantity?: number;
    volume?: number;
}

const Info: React.FC<Props> = ({basePrice, sharesQuantity, volume}) => {
    return (
        <Component>
            <Param><ParamLabel>Base Price:</ParamLabel> <ParamValue>{formatPrice(basePrice)}</ParamValue></Param>
            <Param><ParamLabel>Shares Quantity:</ParamLabel> <ParamValue>{formatNumber(sharesQuantity)}</ParamValue></Param>
            <Param><ParamLabel>Volume:</ParamLabel> <ParamValue>{formatNumber(volume)}</ParamValue></Param>
        </Component>
    );
}

export default Info;

const Component = styled.div`
    margin-left: auto;
`;

const Param = styled.div`
    display: flex;
    font-size: 12px;
`;

const ParamValue = styled.span`
    display: flex;
    font-weight: bold;
    margin-left: 5px;
    width: 60px;
`;

const ParamLabel = styled.span`
    display: block;
    width: 100px;
    text-align: right;
`;
