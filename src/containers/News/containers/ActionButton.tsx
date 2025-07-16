import React from 'react';
import styled from "styled-components";
import {saxoOrder, tigerOrder} from "../../../services/saxo.ts";

type Props = {
    client: 'tiger' | 'saxo';
    ticker: string;
    total: number;
    maxPrice: number;
}

const ActionButton: React.FC<Props> = ({client, total, ticker, maxPrice}) => {
    const onClick = async () => {
        try {
            const response = client === 'tiger' ? await tigerOrder(ticker, total, maxPrice) : await saxoOrder(ticker, total, maxPrice);
            alert('Ордер выставлен: ' + response.orderId);
        } catch (e: any) {
            alert('Ошибка первого ордера:' + e.message);
        }
    }

    return (
        <Component $client={client} onClick={onClick}>
            {total} $
        </Component>
    );
}

export default ActionButton;

const Component = styled.button<{ $client: 'tiger' | 'saxo' }>`
    cursor: pointer;
    text-decoration: none;
    padding: 5px 10px;
    background: #eee;
    font-weight: bold;
    font-size: 14px;
    transition: 0.3s all ease;

    background: ${props => props.$client === 'tiger' ? 'rgb(255, 225, 0)' : 'rgb(64, 115, 236)'};
    color: #fff;
    
    &:hover {
        opacity: .8;
    }
`;