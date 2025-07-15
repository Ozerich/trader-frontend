import type {NewsEvent} from "../types.ts";
import React, {useContext, useState} from "react";
import {playMusic} from "../music.ts";

export type ContextEvent = {
    isDuplicate: boolean;
    model: NewsEvent;
}

type EventsContextType = {
    events: Array<NewsEvent>,
    addEvent: (item: NewsEvent) => void
    removeEvent: (id: string) => void
};

const EventsContext = React.createContext<EventsContextType>({
    events: [],
    addEvent: () => {
    },
    removeEvent: () => {
    },
});

type Props = {
    children: React.ReactNode
}
const EventsContextProvider: React.FC<Props> = ({children}) => {
    const [events, setEvents] = useState<Array<NewsEvent>>([]);

    const addEvent = (event: NewsEvent) => {

        setEvents(events => {
            /*const isExisted = events.find(item => item.ticker === event.ticker);

            if (isExisted) {
                return events;
            }*/

            playMusic();

            return [...events, event]
        });
    }

    const removeEvent = (id: string) => setEvents(events.filter(item => item.id !== id));

    return (
        <EventsContext.Provider value={{events, addEvent, removeEvent}}>
            {children}
        </EventsContext.Provider>
    )
}

export default EventsContextProvider;

export const useEventsContext = () => useContext(EventsContext);