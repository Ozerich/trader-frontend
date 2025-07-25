import {useEffect} from "react";
import styled from "styled-components";

import socket from "./socket";
import type {NewsEvent} from "./types.ts";
import {CATEGORIES} from "./categories.ts";
import Category from "./containers/Category.tsx";
import {useEventsContext} from "./contexts/events.context.tsx";
import Errors from "./containers/Errors";
import {diffTimeInSeconds} from "./containers/News/components/NewsTime/NewsTime.utils.ts";
import {Config} from "./config.ts";


function App() {
    const {addEvent} = useEventsContext();

    useEffect(() => {
        socket.on("new_event", (data: NewsEvent) => {
            console.log('Socket IN - "new_event"', data);

            if (Config.EventLifeTime !== -1 && diffTimeInSeconds(data.time) >= Config.EventLifeTime) {
                console.log('Skip: ', diffTimeInSeconds(data.time) + ' >= ' + Config.EventLifeTime);
                return;
            }

            addEvent(data);
        });

        return () => {
            socket.off('new_event');
        }
    }, []);


    return (
        <>
            <Errors/>
            <Scene>
                {CATEGORIES.map(category => (
                    <Category key={category.id} id={category.id} name={category.label} index={category.index}/>
                ))}
            </Scene>
        </>
    );
}

export default App

const Scene = styled.div`
    display: grid;
    overflow-y: hidden;
    min-height: calc(-40px + 100vh);
    grid-template-columns: repeat(${CATEGORIES.length}, 1fr);
    grid-template-rows: 1fr;
    justify-content: flex-start;
    max-height: 100vh;
    height: 100vh;
`;