import React from 'react';
import styled from "styled-components";
import {saxoOrder} from "../../../services/saxo.ts";

type Props = {
    ticker: string;
    total: number;
}

const SaxoAction: React.FC<Props> = ({total, ticker}) => {

    const onClick = async () => {
        try {
            const response = await saxoOrder(ticker, total);
            alert('Ордер выставлен: ' + response.orderId);
        } catch (e: any) {
            if (e.message === 'Цена превышает агрессивный допуск') {
                try {
                    const response = await saxoOrder(ticker, total);
                    alert('Ордер #2 выставлен: ' + response.orderId);
                } catch (e: any) {
                    alert('Ошибка второго ордера:' + e.message);
                }
            } else {
                alert('Ошибка первого ордера:' + e.message);
            }
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