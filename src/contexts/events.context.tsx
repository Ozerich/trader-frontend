import type {NewsEvent} from "../types.ts";
import React, {useContext, useState} from "react";

export type ContextEvent = {
    isDuplicate: boolean;
    model: NewsEvent;
}

type EventsContextType = {
    events: Array<ContextEvent>,
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
    const [events, setEvents] = useState<Array<ContextEvent>>([]);

    const addEvent = (event: NewsEvent) => {

        setEvents(events => {
            const isExisted = events.find(item => item.model.ticker === event.ticker);

            const newContextEvent: ContextEvent = {
                isDuplicate: !!isExisted,
                model: event
            };

            return [...events, newContextEvent]
        });
    }

    const removeEvent = (id: string) => setEvents(events.filter(item => item.model.id !== id));

    return (
        <EventsContext.Provider value={{events, addEvent, removeEvent}}>
            {children}
        </EventsContext.Provider>
    )
}

export default EventsContextProvider;

export const useEventsContext = () => useContext(EventsContext);