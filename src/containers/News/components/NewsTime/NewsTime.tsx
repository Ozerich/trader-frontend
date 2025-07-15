import React, {useEffect, useState} from 'react';
import styled, {css} from "styled-components";
import {diffTimeInSeconds} from "./NewsTime.utils.ts";

type Props = {
    value: string;
}

const NewsTime: React.FC<Props> = ({value}) => {

    const [secondsDiff, setSecondsDiff] = useState<number>(0);

    useEffect(() => {
        const updateTimeDiff = () => {
            setSecondsDiff(diffTimeInSeconds(value));
        };

        updateTimeDiff();

        const intervalId = setInterval(updateTimeDiff, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Component $isExpired={secondsDiff > 30}>
            <Value>{value}</Value>
        </Component>
    )
}

export default NewsTime;

const Component = styled.div<{ $isExpired: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 5px;

    ${props => props.$isExpired && css`
        color: red;
    `}
`;

const Value = styled.span`
    font-size: 14px;
`;