import React from 'react';
import styled from "styled-components";
import {formatNumber} from "../../../formatter.ts";


const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
}

type Props = {
    ticker: string;
    name: string | undefined;
    capitalization: number | undefined;
}

const NewsTicker: React.FC<Props> = ({ticker, name, capitalization}) => {
    return (
        <Component onClick={() => copyToClipboard(ticker)}>
            <Header>
                <Ticker>{ticker}</Ticker>
                {capitalization &&
                    <Capitalization>{formatNumber(capitalization)}</Capitalization>}
            </Header>
            <FullName href={`https://finance.yahoo.com/quote/${ticker}/`} target="_blank">{name}</FullName>
        </Component>
    )
}

export default NewsTicker;

const Component = styled.div`

`;

const Header = styled.div`
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

const Capitalization = styled.span`
    display: block;
    font-size: 12px;
`;