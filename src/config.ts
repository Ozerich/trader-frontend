enum Environment {
    Local = 'Local',
    Prod = 'Prod'
}

export const ENV = document.location.href.includes('localhost') ? Environment.Local : Environment.Prod;

type Configuration = {
    EventLifeTime: number;
    EventActualTime: number;
    OverPriceLimitCoefficient: number;
}

const Configurations: Record<Environment, Configuration> = {
    [Environment.Local]: {
        EventActualTime: -1,
        EventLifeTime: -1,
        OverPriceLimitCoefficient: 1.3,
    },
    [Environment.Prod]: {
        EventActualTime: 60,
        EventLifeTime: 120,
        OverPriceLimitCoefficient: 1.3,
    }
};

export const Config: Configuration = Configurations[ENV];