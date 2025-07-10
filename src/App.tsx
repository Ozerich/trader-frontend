import {useEffect, useState} from "react";
import socket from "./socket";

function App() {

    const [events, setEvents] = useState<any>([]);

    useEffect(() => {
        // Подписка на событие
        socket.on("new_event", (data) => {
            console.log("Пришёл ивент:", data);
            setEvents(events => [...events, data]);
        });

        // Очистка слушателя при размонтировании
        return () => {
            socket.off("new_event");
        };
    }, []);

    return (
        <ul>
            {events.map((item: any, index: number) => {
                return <li key={index}>{JSON.stringify(item)}</li>
            })}
        </ul>
    )
}

export default App
