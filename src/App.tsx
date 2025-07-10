import {useEffect, useState} from "react";
import socket from "./socket";
import News from "./components/News.tsx";
import styled from "styled-components";
import type {NewsEvent} from "./types.ts";

function App() {

    const [events, setEvents] = useState<Array<NewsEvent>>([]);

    useEffect(() => {
        // Подписка на событие
        socket.on("new_event", (data: NewsEvent) => {
            console.log("Пришёл ивент:", data);
            setEvents(events => [data, ...events]);
        });

        return () => {
            socket.off("new_event");
        };
    }, []);

    return (
        <List>
            {
                (events.map((item, index: number) => {
                    return <News model={item} key={index}/>
                }))
            }
        </List>
    )
}

export default App

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 1000px;
    margin: 0 auto;
`;