import React from 'react';
import styled from "styled-components";

import ActionButton from "./ActionButton.tsx";

type Props = {
    ticker: string;
    maxPrice: number;
}
const NewsActions: React.FC<Props> = ({ticker, maxPrice}) => {
    const client = window.location.search?.includes('saxo') ? 'saxo' : (window.location.search?.includes('tiger') ? 'tiger' : null);

    if (!client) {
        return null;
    }

    const amounts = client === 'tiger' ? [10, 50, 100] : [100, 500, 1000, 4000];

    return (
        <Actions>
            {amounts.map(amount => <ActionButton key={amount} client={client} ticker={ticker} total={amount}
                                                 maxPrice={maxPrice}/>)}
        </Actions>
    );
}

export default NewsActions;


const Actions = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
    width: 100%;
`;