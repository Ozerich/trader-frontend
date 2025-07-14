import ErrorsView from "./Errors.view.tsx";
import {useEffect, useState} from "react";
import socket from "../../socket.ts";

const Errors = () => {
    const [socketDisconnected, setSocketDisconnected] = useState<boolean>(false);
    const [soundDisabled, setSoundDisabled] = useState<boolean>(true);

    useEffect(() => {
        socket.on('disconnect', () => {
            setSocketDisconnected(true);
        });

        socket.on('connect', () => {
            setSocketDisconnected(false);
        });
    }, []);

    useEffect(() => {
        const markUserInteraction = () => {
            window.removeEventListener('click', markUserInteraction);
            window.removeEventListener('keydown', markUserInteraction);
            window.removeEventListener('touchstart', markUserInteraction);

            setSoundDisabled(false);
        }

        window.addEventListener('click', markUserInteraction);
        window.addEventListener('keydown', markUserInteraction);
        window.addEventListener('touchstart', markUserInteraction);
    }, []);

    const errors: string[] = [];
    if (soundDisabled) {
        errors.push('Sound disabled');
    }
    if (socketDisconnected) {
        errors.push('Socket disconnected');
    }

    return (
        <ErrorsView errors={errors}/>
    )
}

export default Errors;