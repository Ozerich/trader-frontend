import React from 'react';
import styled from "styled-components";
import type {NewsEventActivity} from "../../../types.ts";

type Props = {
    data: NewsEventActivity;
}
const PriceHistory: React.FC<Props> = ({data}) => {

    console.log(data);

    if (!data.length) {
        return null;
    }

    const prices = [data[0].open];
    data.forEach(item => prices.push(item.close));

    return (
        <Row>
            <PricesRow>
                {prices.map((item, index) => <Item>
                        <Price>{item}</Price>
                        {index < prices.length - 1 && <Splitter><i>→</i><Volume>{data[index].volume}</Volume></Splitter>}
                    </Item>
                )}
            </PricesRow>
        </Row>
    );
}

export default PriceHistory;

const Row = styled.div`
    display: flex;
`;

const PricesRow = styled.div`
    display: flex;
    gap: 10px;
    font-size: 14px;
`;

const Item = styled.div`
    display: flex;
    gap: 5px;
`;

const Price = styled.span``;

const Splitter = styled.div`
    display: flex;
    flex-direction: column;
    gap:2px;
    align-items: center;
    margin-top: -2px;
`;

const Volume = styled.span`
    text-align: center;
    font-size: 80%;
    opacity:.5;
`;