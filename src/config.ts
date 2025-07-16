type Environment = 'Local' | 'Prod'

export const ENV = document.location.href.includes('localhost') ? 'Local' : 'Prod';

type Configuration = {
    EventLifeTime: number;
    EventActualTime: number;
    OverPriceLimitCoefficient: number;
    HighlightWords: string[];
}

const Configurations: Record<Environment, Configuration> = {
    Local: {
        EventActualTime: 10,
        EventLifeTime: 180,
        OverPriceLimitCoefficient: 1.3,
        HighlightWords: ['positive', 'patent'],
    },
    Prod: {
        EventActualTime: 60,
        EventLifeTime: 180,
        OverPriceLimitCoefficient: 1.3,
        HighlightWords: ['positive', 'patent'],
    }
};

export const Config: Configuration = Configurations[ENV];