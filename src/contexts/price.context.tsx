// PriceContext.tsx
import {createContext, useContext, useReducer} from "react";

const PriceContext = createContext<any>(null);

const reducer = (state: any, action: any) => {
    return {
        ...state,
        [action.t]: {a: action.a, b: action.b},
    };
};

export const PriceProvider = ({children}: any) => {
    const [state, dispatch] = useReducer(reducer, {});

    return (
        <PriceContext.Provider value={{state, dispatch}}>
            {children}
        </PriceContext.Provider>
    );
};

export const usePrices = () => useContext(PriceContext);
