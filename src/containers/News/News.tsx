import React, {useEffect, useState} from 'react';
import styled, {css} from "styled-components";
import SaxoAction from "./components/SaxoAction.tsx";
import NewsTime from "./components/NewsTime/NewsTime.tsx";
import NewsTicker from "./containers/NewsTicker.tsx";
import type {ContextEvent} from "../../contexts/events.context.tsx";
import Info from "./containers/Info.tsx";
import Price from "./containers/Price/Price.tsx";
import PriceHistory from "./components/PriceHistory.tsx";
import {fetchPrice, fetchVolume, tickerInfo} from "../../services/backend.ts";
import type {NewsEventActivity} from "../../types.ts";

type Props = {
    event: ContextEvent,
    onRemoveClick: () => void;
}

const News: React.FC<Props> = ({event, onRemoveClick}) => {

    const {model, isDuplicate} = event;

    const [capitalization, setCapitalization] = useState<number | undefined>();
    const [name, setName] = useState<string | undefined>();
    const [sharesQuantity, setSharesQuantity] = useState<number | undefined>();
    const [basePrice, setBasePrice] = useState<number | undefined>();
    const [askPrice, setAskPrice] = useState<number | undefined>();
    const [bidPrice, setBidPrice] = useState<number | undefined>();
    const [volume, setVolume] = useState<number | undefined>();
    const [history, setHistory] = useState<NewsEventActivity>([]);

    useEffect(() => {
        tickerInfo(model.ticker).then(response => {
            setCapitalization(response.marketCap);
            setName(response.name);
            setSharesQuantity(response.sharesQuantity);
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

    const maxPriceToBuy = basePrice ? Math.round(basePrice * 1.3 * 100) / 100 : null;

    return (
        <Component $isDuplicate={isDuplicate}>

            <Header>
                <NewsTime value={model.time}/>
                <NewsTicker ticker={model.ticker} name={name} capitalization={capitalization}/>
                <Info sharesQuantity={sharesQuantity} basePrice={basePrice} volume={volume}/>
            </Header>

            <PriceWrapper>
                <Price ticker={model.ticker} basePrice={basePrice} defaultAsk={askPrice} defaultBid={bidPrice}/>
                <PriceHistory data={history}/>
            </PriceWrapper>

            <Content>
                <Title>{model.title.ru}</Title>
                <Subtitle>{model.title.en}</Subtitle>
                <Subtitle>{model.subtitle}</Subtitle>
            </Content>

            <Bottom>
                <Actions>
                    {window.location.search?.includes('saxo') && maxPriceToBuy ? <>
                        <SaxoAction ticker={model.ticker} total={100} maxPrice={maxPriceToBuy}/>
                        <SaxoAction ticker={model.ticker} total={500} maxPrice={maxPriceToBuy}/>
                        <SaxoAction ticker={model.ticker} total={1000} maxPrice={maxPriceToBuy}/>
                        <SaxoAction ticker={model.ticker} total={5000} maxPrice={maxPriceToBuy}/>
                    </> : null}
                    <RemoveButton onClick={onRemoveClick}>Remove</RemoveButton>
                </Actions>
            </Bottom>
        </Component>
    )
}

export default News;


const Component = styled.div<{ $isDuplicate: boolean }>`
    border: 1px solid #aaa;
    background: #eee;
    overflow: hidden;

    ${props => props.$isDuplicate && css`
        opacity: .3;
    `}
`;

const PriceWrapper = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    width: 100%;
    height: 30px;
`;

const Header = styled.div`
    display: flex;
    gap: 30px;
    border-bottom: 1px dashed #ddd;
    padding: 10px;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 10px 10px;
    font-size: 14px;
`;

const Title = styled.p`
    margin-bottom: 5px;
`;

const Subtitle = styled.p`
    border-top: 1px;
    margin-top: 5px;
    padding-top: 5px;
    font-size: 10px;
`

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
