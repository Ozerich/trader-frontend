import React, {useEffect, useState} from 'react';
import styled, {css} from "styled-components";
import NewsTicker from "./containers/NewsTicker.tsx";
import Info from "./containers/Info.tsx";
import Price from "./containers/Price/Price.tsx";
import PriceHistory from "./components/PriceHistory.tsx";
import {fetchPrice, fetchVolume, tickerInfo} from "../../services/backend.ts";
import type {NewsEvent, NewsEventActivity} from "../../types.ts";
import {diffTimeInSeconds} from "./components/NewsTime/NewsTime.utils.ts";
import NewsActions from "./containers/NewsActions.tsx";
import {Config} from "../../config.ts";
import Timer from "./containers/Timer.tsx";
import {highlightKeywords} from "../../formatter.ts";

type Props = {
    model: NewsEvent,
    onRemove: (id: string) => void;
}

const News: React.FC<Props> = ({model, onRemove}) => {
    const [capitalization, setCapitalization] = useState<number | undefined>();
    const [name, setName] = useState<string | undefined>();
    const [basePrice, setBasePrice] = useState<number | undefined>();
    const [askPrice, setAskPrice] = useState<number | undefined>();
    const [bidPrice, setBidPrice] = useState<number | undefined>();
    const [volume, setVolume] = useState<number | undefined>();
    const [history, setHistory] = useState<NewsEventActivity>([]);
    const [isExpired, setIsExpired] = useState<boolean>(false);

    useEffect(() => {
        tickerInfo(model.ticker).then(response => {
            setCapitalization(response.marketCap);
            setName(response.name);
        });

        fetchVolume(model.ticker).then(response => {
            setVolume(response);
        });

        fetchPrice(model.ticker).then(response => {
            setBasePrice(response.price.base);
            setAskPrice(response.price.ask);
            setBidPrice(response.price.bid);
            setHistory(response.activity);
        });
    }, []);

    useEffect(() => {
        if (Config.EventActualTime === -1) return;

        let expiredTimeout: number;

        const diffInSeconds = diffTimeInSeconds(model.time);

        if (diffInSeconds < Config.EventActualTime) {
            setIsExpired(false);

            expiredTimeout = setTimeout(() => {
                setIsExpired(true);
            }, (Config.EventActualTime - diffInSeconds) * 1000);
        }

        return () => {
            if (expiredTimeout) {
                clearTimeout(expiredTimeout);
            }
        }
    }, [model]);

    useEffect(() => {
        if (Config.EventLifeTime === -1) return;

        let lifeTimeTimout: number;

        const diffInSeconds = diffTimeInSeconds(model.time);

        if (diffInSeconds >= Config.EventLifeTime) {
            onRemove(model.id);
        } else {
            lifeTimeTimout = setTimeout(() => {
                onRemove(model.id);
            }, (Config.EventLifeTime - diffInSeconds) * 1000);
        }

        return () => {
            if (lifeTimeTimout) {
                clearTimeout(lifeTimeTimout);
            }
        }
    }, [model, onRemove]);

    const maxPriceToBuy = basePrice ? Math.round(basePrice * Config.OverPriceLimitCoefficient * 100) / 100 : null;

    const getError = (): string | null => {
        if (isExpired) {
            return 'Expired'
        }

        if (askPrice && basePrice && askPrice >= basePrice * Config.OverPriceLimitCoefficient) {
            return 'ASK Price is higher than 30%';
        }

        return null;
    }

    const error = getError();

    return (
        <Component $withError={!!error} $isExpired={isExpired} className="news-card">
            <Number>{model.number}</Number>

            <Header>
                <Timer time={model.time}/>
                <NewsTicker ticker={model.ticker} name={name}/>
            </Header>

            <PriceWrapper>
                <Left>
                    <Info basePrice={basePrice} volume={volume} capitalization={capitalization}/>
                    <Price ticker={model.ticker} basePrice={basePrice} defaultAsk={askPrice} defaultBid={bidPrice}
                           liveUpdate={!isExpired}/>
                </Left>
                <PriceHistory data={history}/>
            </PriceWrapper>

            <Content>
                <Title dangerouslySetInnerHTML={{__html: highlightKeywords(model.title.ru)}}/>
                <Subtitle dangerouslySetInnerHTML={{__html: highlightKeywords(model.title.en)}}/>
                <Subtitle dangerouslySetInnerHTML={{__html: highlightKeywords(model.subtitle)}}/>
            </Content>

            <Bottom>
                <BottomLeft>
                    {maxPriceToBuy && !error ? <>
                        <NewsActions ticker={model.ticker} maxPrice={maxPriceToBuy}/>
                    </> : null}
                    {error && <Error>{error}</Error>}
                </BottomLeft>
                <BottomRight>
                    <RemoveButton onClick={() => {
                        onRemove(model.id);
                    }}>Remove</RemoveButton>
                </BottomRight>
            </Bottom>
        </Component>
    )
}

export default News;

const Left = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const Number = styled.span`
    position: absolute;
    background: #ccc;
    padding: 5px 10px;
    font-size: 14px;
    font-weight: bold;
    right: 0;
    top: 0;
`;

const BottomLeft = styled.div`

`;

const BottomRight = styled.div`
    margin-left: auto;
`;

const Component = styled.div<{ $withError: boolean, $isExpired: boolean }>`
    border: 2px solid ${props => props.$withError ? 'red' : '#aaa'};
    background: #eee;
    overflow: hidden;
    position: relative;

    ${props => props.$isExpired && css`
        background: #eee !important;
        opacity: .5;
    `}
    &.news-card--up {
        background: #cdf8cd;
    }

    &.news-card--down {
        background: #f6c1c1;
    }
`;

const PriceWrapper = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    width: 100%;
`;

const Header = styled.div`
    display: flex;
    gap: 15px;
    border-bottom: 1px dashed #ddd;
    padding: 5px 10px;
    align-items: center;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 10px 10px;
    font-size: 14px;
`;

const Title = styled.p`
    margin-bottom: 5px;

    mark {
        font-weight: bold;
        background: #63e668;
        padding: 2px 2px;
    }
`;

const Subtitle = styled.p`
    border-top: 1px;
    margin-top: 5px;
    padding-top: 5px;
    font-size: 10px;

    mark {
        font-weight: bold;
        background: #63e668;
        padding: 2px 2px;
    }
`


const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #ddd;
    padding: 10px 15px;
`;

const RemoveButton = styled.button`
    color: red;
    font-weight: bold;
    font-size: 10px;
    background: transparent;
    padding: 5px 10px;
    border: 1px solid red;
    cursor: pointer;
    transition: 0.3s all ease;
    display: block;
    border-radius: 5px;
    margin-left: auto;

    &:hover {
        background: red;
        color: white;
    }
`;

const Error = styled.div`
    background: red;
    color: #fff;
    padding: 5px 20px;
    font-size: 12px;
`;
