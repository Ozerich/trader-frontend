import React from 'react';
import styled from "styled-components";

type Props = {
    errors: string[];
}

const ErrorsView: React.FC<Props> = ({errors}) => {
    return (
        <List>
            {errors.map(item => <Error key={item}>{item}</Error>)}
        </List>
    );
}

export default ErrorsView

const List = styled.div`
    position: fixed;
    right: 10px;
    top: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    z-index: 2;
`;

const Error = styled.div`
    background: red;
    color: #fff;
    border-radius: 5px;
    padding: 10px 50px;
    text-align: center;
    font-size: 14px;
`;