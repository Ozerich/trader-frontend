import React from 'react';
import styled from "styled-components";
import type {NewsEventActivity} from "../../../types.ts";
import {formatNumber, formatPrice} from "../../../formatter.ts";

type Props = {
    data: NewsEventActivity;
}
const PriceHistory: React.FC<Props> = ({data}) => {
    if (!data.length) {
        return null;
    }

    const prices = [data[0].open];
    data.forEach(item => prices.push(item.close));

    return (
        <Row>
            <PricesRow>
                {prices.map((item, index) => {
                        const previousPrice = index > 0 ? prices[index - 1] : 0;
                        const direction = index > 0 ? (item > previousPrice ? 'up' : (item < previousPrice ? 'down' : undefined)) : undefined;

                        return <Item>
                            <Price $direction={direction}>{formatPrice(item)}</Price>
                            {index < prices.length - 1 && (
                                <Splitter>
                                    <Time>{data[index].time}</Time>
                                    <i>→</i>
                                    <Volume>{formatNumber(data[index].volume)}</Volume>
                                </Splitter>
                            )}
                        </Item>
                    }
                )}
            </PricesRow>
        </Row>
    );
}

export default PriceHistory;

const Row = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
`;

const PricesRow = styled.div`
    display: flex;
    gap: 5px;
    font-size: 13px;
`;

const Item = styled.div`
    display: flex;
    gap: 5px;
`;

const Price = styled.span<{ $direction?: 'up' | 'down' }>`
    color: ${props => props.$direction === 'up' ? 'green' : (props.$direction === 'down' ? 'red' : '')};
    transform: translateY(4px);
`;

const Splitter = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    align-items: center;
    margin-top: -2px;
    font-size: 10px;
    line-height: 100%;

    i {
        margin-top: -4px;
        display: block;
    }
`;

const Time = styled.span`
    text-align: center;
    font-size: 90%;
    opacity: .5;
`;

const Volume = styled.span`
    text-align: center;
    font-size: 90%;
    opacity: .5;
    white-space: nowrap;
`;