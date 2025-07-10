import React from 'react';
import styled from "styled-components";

type Props = {
    value: string;
}

const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
}

const NewsTicker: React.FC<Props> = ({value}) => {
    return (
        <Component onClick={() => copyToClipboard(value)}>
            <Value>{value}</Value>
        </Component>
    )
}

export default NewsTicker;

const Component = styled.div`

`;

const Value = styled.span`
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
`;