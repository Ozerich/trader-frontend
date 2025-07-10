import React from 'react';
import styled from "styled-components";
import type {NewsEvent} from "../../types.ts";
import Price from "../../containers/Price.tsx";
import SaxoAction from "./components/SaxoAction.tsx";

type Props = {
    model: NewsEvent,
    onRemoveClick: () => void;
}

const News: React.FC<Props> = ({model, onRemoveClick}) => {

    return (
        <Component>
            <Header>
                <Time>{model.time}</Time>
                <Ticker>{model.ticker}</Ticker>
                <PriceContainer>
                    <Price ticker={model.ticker} defaultAsk={model.price.ask} defaultBid={model.price.bid}
                           basePrice={model.basePrice}/>
                    <PriceHistory>
                        {model.activity.map(item => {
                            return <PriceItem>
                                <PriceItemRange>{item.open} → {item.close}</PriceItemRange>
                                <PriceItemVolume>{item.volume}</PriceItemVolume>
                            </PriceItem>
                        })}
                    </PriceHistory>
                </PriceContainer>
            </Header>

            <Content>
                <Title>{model.title.ru}</Title>
                <Title>{model.title.en}</Title>
                <Subtitle>{model.subtitle}</Subtitle>
            </Content>

            <Bottom>
                <Links>
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
                </Links>
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

const Component = styled.div`
    border: 1px solid #eee;
    padding: 5px;
`;


const Time = styled.div`

`;

const Ticker = styled.span`
    font-weight: bold;
`;

const Header = styled.div`
    display: flex;
    gap: 10px;
    border-bottom: 1px dashed #eee;
    padding: 15px;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 15px;
`;

const Title = styled.p`
    margin: 0;
`;

const Subtitle = styled.p`
    margin: 0;
`

const PriceContainer = styled.span`
    margin-left: auto;
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: flex-end;
`;

const PriceHistory = styled.div`
    display: flex;
    gap: 10px;
`;


const PriceItem = styled.span`
    font-size: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const PriceItemRange = styled.div`

`;

const PriceItemVolume = styled.span`
    display: block;
    text-align: center;
`;

const Links = styled.div`
    display: flex;
    gap: 15px;
`;


const Actions = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
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

    &:hover {
        background: red;
        color: white;
    }
`;

const Link = styled.a``;