import React from 'react';
import SaxoAction from "../components/SaxoAction.tsx";
import styled from "styled-components";

type Props = {
    ticker: string;
    maxPrice: number;
}
const NewsSaxoActions: React.FC<Props> = ({ticker, maxPrice}) => {
    return (
        <Actions>
            <SaxoAction ticker={ticker} total={100} maxPrice={maxPrice}/>
            <SaxoAction ticker={ticker} total={500} maxPrice={maxPrice}/>
            <SaxoAction ticker={ticker} total={1000} maxPrice={maxPrice}/>
            <SaxoAction ticker={ticker} total={5000} maxPrice={maxPrice}/>
        </Actions>
    );
}

export default NewsSaxoActions;


const Actions = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
    width: 100%;
`;