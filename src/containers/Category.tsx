import React from 'react';
import styled from "styled-components";
import News from "./News";
import {useEventsContext} from "../contexts/events.context.tsx";

type Props = {
    id: string,
    name: string
}

const Category: React.FC<Props> = ({id, name}) => {
    const {removeEvent, events} = useEventsContext();

    const removeNews = (id: string) => {
        removeEvent(id);
    }

    const eventsByCategory = events.filter(item => item.model.category === id);

    return (
        <Column>
            <Title>{name}</Title>
            <List>
                {(eventsByCategory.map((item) => {
                    return <News event={item} key={item.model.id}
                                 onRemoveClick={() => removeNews(item.model.id)}/>
                }))}
            </List>
        </Column>
    )
}

export default Category;


const Column = styled.div`
    display: flex;
    flex-direction: column;
    border-right: 1px solid rgb(238, 238, 238);
    min-width: 600px;
`;

const Title = styled.span`
    font-weight: bold;
    display: block;
    text-align: center;
    border-bottom: 1px solid #eee;
    padding: 10px 0;
`;

const List = styled.div`
    padding: 10px 10px 20px 10px;
    overflow: auto;
    max-height: calc(100vh - 40px);

    > * {
        margin-top: 10px;

        &:first-child {
            margin-top: 0;
        }
    }
`;