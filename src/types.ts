export type NewsEvent = {
    id: string;
    title: {
        ru: string;
        en: string;
    };
    subtitle: string;
    time: string;
    ticker: string;
    activity: Array<{
        open: number;
        close: number;
        volume: number;
    }>;
    price: {
        ask: number,
        bid: number,
        mid: number;
    },
    basePrice: number;
}