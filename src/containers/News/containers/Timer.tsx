import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {diffTimeInSeconds} from "../components/NewsTime/NewsTime.utils.ts";
import {Config} from "../../../config.ts";

type Props = {
    time: string;
}

const Timer: React.FC<Props> = ({time}) => {
    const [value, setValue] = useState<number>(diffTimeInSeconds(time));

    useEffect(() => {
        const timer = setInterval(() => {
            setValue(value => value + 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    }, []);


    return (
        <Component>
            {Config.EventActualTime !== -1 && value > Config.EventActualTime ? '-' : (value < 10 ? '0' + value : value)}
        </Component>
    );
}

export default Timer;

const Component = styled.span`
    border-radius: 100%;
    border: 1px solid #ccc;
    padding: 10px;
    width: 15px;
    height: 15px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
`;