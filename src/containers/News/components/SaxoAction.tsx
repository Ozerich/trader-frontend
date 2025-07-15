import React from 'react';
import styled from "styled-components";
import {saxoOrder} from "../../../services/saxo.ts";

type Props = {
    ticker: string;
    total: number;
    maxPrice: number;
}

const SaxoAction: React.FC<Props> = ({total, ticker, maxPrice}) => {

    const onClick = async () => {
        try {
            const response = await saxoOrder(ticker, total, maxPrice);
            alert('Ордер выставлен: ' + response.orderId);
        } catch (e: any) {
            alert('Ошибка первого ордера:' + e.message);
        }
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
    font-size: 14px;
    transition: 0.3s all ease;
    
    &:hover{
        background: #aaa;
        color: #fff;
    }
`;