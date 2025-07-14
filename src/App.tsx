import {useEffect, useState} from "react";
import socket from "./socket";
import News from "./components/News/News.tsx";
import styled from "styled-components";
import type {NewsEvent} from "./types.ts";
import {usePrices} from "./contexts/price.context.tsx";
import {CATEGORIES} from "./categories.ts";

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
            if (item.t) {
                dispatch({t: item.t, a: item.a, b: item.b});
            }
        })

        return () => {
            socket.off("new_event");
        };
    }, []);

    const removeNews = (id: string, ticker: string) => {
        const eventsWithTicker = events.filter(item => item.ticker === ticker);

        setEvents(events.filter(item => item.id !== id));

        if (eventsWithTicker.length === 1) {
            socket.emit("unsubscribe_ticker", ticker);
        }
    }

    return <Scene>
        {CATEGORIES.map(category => (
            <Column>
                <Title>{category.label}</Title>
                <List>
                    {(events.filter(item => item.category === category.id).map((item) => {
                        return <News model={item} key={item.id}
                                     onRemoveClick={() => removeNews(item.id, item.ticker)}/>
                    }))}
                </List>
            </Column>
        ))}
    </Scene>;
}

export default App

const Scene = styled.div`
    display: grid;
    padding: 10px;
    min-height: calc(-40px + 100vh);
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    border-right: 1px solid rgb(238, 238, 238);
    padding: 10px;
`;

const Title = styled.span`
    font-weight: bold;
    display: block;
    text-align: center;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
`;