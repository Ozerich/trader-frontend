import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import type {NewsEvent} from "../../types.ts";
import Price from "../../containers/Price.tsx";
import SaxoAction from "./components/SaxoAction.tsx";
import PriceHistory from "./components/PriceHistory.tsx";
import NewsTime from "./components/NewsTime/NewsTime.tsx";
import NewsTicker from "./components/NewsTicker.tsx";
import {diffTimeInSeconds} from "./components/NewsTime/NewsTime.utils.ts";

type Props = {
    model: NewsEvent,
    onRemoveClick: () => void;
}

const News: React.FC<Props> = ({model, onRemoveClick}) => {

    const [secondsDiff, setSecondsDiff] = useState<number>(0);

    useEffect(() => {
        const updateTimeDiff = () => {
            setSecondsDiff(diffTimeInSeconds(model.time));
        };

        updateTimeDiff();

        const intervalId = setInterval(updateTimeDiff, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const isExpired = secondsDiff > 30;

    return (
        <Component $expired={isExpired}>
            <Header>
                <NewsTime value={model.time} seconds={secondsDiff} isExpired={isExpired}/>
                <NewsTicker value={model.ticker}/>
                <PriceContainer>
                    <PriceHistory data={model.activity}/>
                    <Price ticker={model.ticker}
                           defaultAsk={model.price.ask}
                           defaultBid={model.price.bid}
                           basePrice={model.basePrice}
                    />
                </PriceContainer>
            </Header>

            <Content>
                <Title>{model.title.ru}</Title>
                <Title>{model.title.en}</Title>
                <Subtitle>{model.subtitle}</Subtitle>
            </Content>

            <Bottom>
                {/*<Links>
                    <Link target="_blank" href={`https://stocktwits.com/symbol/${model.ticker}`}>
                        StockTwits
                    </Link>
                    <Link target="_blank" href={`https://finance.yahoo.com/quote/${model.ticker}`}>
                        Finance.Yahoo
                    </Link>
                    <Link target="_blank" href={`https://www.marketwatch.com/investing/stock/${model.ticker}`}>
                        MarketWatch
                    </Link>
                    <Link target="_blank" href={`https://www.tradingview.com/chart/?symbol=${model.ticker}`}>
                        TradingView
                    </Link>
                </Links>*/}
                <Actions>
                    {window.location.search?.includes('saxo') ? <>
                        <SaxoAction ticker={model.ticker} total={100} basePrice={model.price.ask}/>
                        <SaxoAction ticker={model.ticker} total={500} basePrice={model.price.ask}/>
                        <SaxoAction ticker={model.ticker} total={1000} basePrice={model.price.ask}/>
                    </> : null}
                    <RemoveButton onClick={onRemoveClick}>Remove</RemoveButton>
                </Actions>
            </Bottom>
        </Component>
    )
}

export default News;


const Component = styled.div<{ $expired: boolean }>`
    border: 1px solid #eee;
    padding: 5px;
    background: ${props => props.$expired ? '#fff3f3' : '#d3fbd3'};
`;


const Header = styled.div`
    display: flex;
    gap: 30px;
    border-bottom: 1px dashed #eee;
    padding: 10px;
    align-items: center;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    font-size: 14px;
`;

const Title = styled.p`
    margin-bottom: 5px;
`;

const Subtitle = styled.p`
    border-top: 1px;
    margin-top: 5px;
    padding-top: 5px;
    font-size: 12px;
`

const PriceContainer = styled.span`
    margin-left: auto;
    display: flex;
    gap: 20px;
    align-items: center;
`;


const Links = styled.div`
    display: flex;
    gap: 15px;
`;


const Actions = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
    width: 100%;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #ddd;
    padding: 15px;
`;

const RemoveButton = styled.button`
    color: red;
    font-weight: bold;
    font-size: 14px;
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

const Link = styled.a``;