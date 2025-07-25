import type {NewsEvent} from "../types.ts";
import React, {useContext, useState} from "react";
import {playMusic} from "../music.ts";


type EventsContextType = {
    events: Array<NewsEvent>,
    addEvent: (item: NewsEvent) => void
    removeEvent: (id: string) => void
    isHidden: (id: string) => boolean
};

const EventsContext = React.createContext<EventsContextType>({
    events: [],
    isHidden: () => {
        return false;
    },
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

    const [hiddenIds, setHiddenIds] = useState<Array<string>>([]);

    const isHidden = (id: string) => hiddenIds.includes(id);

    const addEvent = (event: NewsEvent) => {
        playMusic();
        setEvents(events => [...events, event]);
    }

    const removeEvent = (id: string) => {
        setHiddenIds([...hiddenIds, id]);
    }

    return (
        <EventsContext.Provider value={{events, addEvent, removeEvent, isHidden}}>
            {children}
        </EventsContext.Provider>
    )
}

export default EventsContextProvider;

export const useEventsContext = () => useContext(EventsContext);