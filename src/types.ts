export type NewsEventActivity = Array<{
    open: number;
    close: number;
    volume: number;
    time: string;
}>;

export type NewsEvent = {
    id: string;
    number: number;
    category: string;
    title: {
        ru: string;
        en: string;
    };
    subtitle: string;
    time: string;
    ticker: string;
}