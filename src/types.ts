export type NewsEventActivity = Array<{
    open: number;
    close: number;
    volume: number;
}>;

export type NewsEvent = {
    id: string;
    category: string;
    title: {
        ru: string;
        en: string;
    };
    subtitle: string;
    time: string;
    ticker: string;
    activity: NewsEventActivity;
    price: {
        ask: number,
        bid: number,
        mid: number;
    },
    basePrice: number;
}