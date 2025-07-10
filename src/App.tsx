import {useEffect, useState} from "react";
import socket from "./socket";

function App() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Подписка на событие
        socket.on("new_event", (data) => {
            console.log("Пришёл ивент:", data);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setEvents(events => [...events, data]);
        });

        // Очистка слушателя при размонтировании
        return () => {
            socket.off("new_event");
        };
    }, []);

    return (
        <ul>
            {events.map((item, index: number) => {
                return <li key={index}>{JSON.stringify(item)}</li>
            })}
        </ul>
    )
}

export default App
