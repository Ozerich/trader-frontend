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

    let account = '';
    if (client === 'tiger') {
        account = window.location.search?.includes('account=vital') ? 'vital' : 'krivyan';
    }

    const amounts = client === 'tiger' ? (account === 'vital' ? [10, 25, 50, 75] : [1000, 5000, 10000]) : [1000, 2500, 5000, 10000];

    return (
        <Actions>
            {amounts.map(amount => <ActionButton key={amount} account={account} client={client} ticker={ticker}
                                                 total={amount}
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