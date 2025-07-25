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
    time: string;
    title: {
        ru: string;
        en: string;
    };
    subtitle: string;
    company: {
        ticker: string;
        name: string;
        marketCap: number;
    }
}