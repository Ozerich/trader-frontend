import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {PriceProvider} from "./contexts/price.context.tsx";
import EventsContextProvider from "./contexts/events.context.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <EventsContextProvider>
            <PriceProvider>
                <App/>
            </PriceProvider>
        </EventsContextProvider>
    </StrictMode>,
)
