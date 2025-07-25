import React from 'react';
import styled from "styled-components";
import {formatNumber} from "../../../formatter.ts";


const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
}

type Props = {
    ticker: string;
    name: string;
    capitalization: number;
}

const NewsTicker: React.FC<Props> = ({ticker, name, capitalization}) => {

    return (
        <Component onClick={() => copyToClipboard(ticker)}>
            <Left>
                <Ticker>{ticker}</Ticker>
            </Left>
            <Right>
                <FullName href={`https://finance.yahoo.com/quote/${ticker}/`} target="_blank">{name}</FullName>
                <Capitalization>{formatNumber(capitalization)}</Capitalization>
            </Right>
        </Component>
    )
}

export default NewsTicker;

const Component = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
`;

const Right = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const Capitalization = styled.span`
    font-size: 12px;
    line-height: 100%;
    display: block;
    color: #555;
    font-weight: bold;
`;

const Left = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Ticker = styled.span`
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
`;

const FullName = styled.a`
    font-size: 12px;
    line-height: 100%;
    color: #555;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px;
    display: block;
    transition: 0.3s all ease;
    text-decoration: none;

    &:hover {
        color: #333;
    }
`;
