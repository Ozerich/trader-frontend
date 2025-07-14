import React from 'react';
import styled from "styled-components";

type Props = {
    value: string;
    seconds: number;
}

const NewsTime: React.FC<Props> = ({value, seconds}) => {

    return (
        <Component>
            <Value>{value}</Value>
            <Timer>{seconds + ' sec. ago'}</Timer>
        </Component>
    )
}

export default NewsTime;

const Component = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const Value = styled.span`
    font-size: 14px;
`;

const Timer = styled.span`
    font-size: 10px;
`;