import {useEffect, useState} from "react";
import socket from "./socket";
import News from "./components/News/News.tsx";
import styled from "styled-components";
import type {NewsEvent} from "./types.ts";
import {usePrices} from "./contexts/price.context.tsx";

const audio = new Audio('/news-sound.mp3');

function App() {
    const {dispatch} = usePrices();

    const [events, setEvents] = useState<Array<NewsEvent>>([]);


    useEffect(() => {
        socket.on("new_event", (data: NewsEvent) => {
            audio.play();

            setEvents(events => [...events, data]);

            socket.emit("subscribe_ticker", data.ticker);
        });

        socket.on('price_update', (item) => {
            dispatch({t: item.t, a: item.a, b: item.b});
        })

        return () => {
            socket.off("new_event");
        };
    }, []);

    const removeNews = (id: string, ticker: string) => {
        setEvents(events.filter(item => item.id !== id));

        socket.emit("unsubscribe_ticker", ticker);
    }

    return (
        <List>
            {
                (events.map((item) => {
                    return <News model={item} key={item.id} onRemoveClick={() => removeNews(item.id, item.ticker)}/>
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