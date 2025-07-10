import {useEffect, useState} from "react";
import socket from "./socket";
import News from "./components/News/News.tsx";
import styled from "styled-components";
import type {NewsEvent} from "./types.ts";
import {usePrices} from "./contexts/price.context.tsx";

function App() {
    const {dispatch} = usePrices();

    const [events, setEvents] = useState<Array<NewsEvent>>([]);

    useEffect(() => {
        socket.on("new_event", (data: NewsEvent) => {
            console.log("Пришёл ивент:", data);
            setEvents(events => [data, ...events]);

            socket.emit("subscribe_ticker", data.ticker);
        });

        socket.on('price_update', (item) => {
            dispatch({t: item.t, a: item.b, b: item.a});
        })

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
    margin: 20px;
`;