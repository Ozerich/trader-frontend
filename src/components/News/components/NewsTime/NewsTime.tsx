import React from 'react';
import styled from "styled-components";

type Props = {
    value: string;
    seconds: number;
    isExpired: boolean;
}

const NewsTime: React.FC<Props> = ({value, seconds, isExpired}) => {

    return (
        <Component $expired={isExpired}>
            <Value>{value}</Value>
            <Timer>{seconds + ' sec. ago'}</Timer>
        </Component>
    )
}

export default NewsTime;

const Component = styled.div<{ $expired: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: flex-end;
    align-items: flex-end;
    color: ${props => props.$expired ? 'red' : 'green'};
`;

const Value = styled.span`
    font-size: 20px;
`;

const Timer = styled.span`
    font-size: 12px;
`;