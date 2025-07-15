import React from 'react';
import styled from "styled-components";
import News from "./News";
import {useEventsContext} from "../contexts/events.context.tsx";
import {CATEGORIES} from "../categories.ts";

type Props = {
    id: string,
    name: string,
    index?: number
}

const Category: React.FC<Props> = ({id, name, index}) => {
    const {removeEvent, events} = useEventsContext();

    const removeNews = (id: string) => {
        removeEvent(id);
    }

    const eventsByCategory = events.filter(item => item.category === id);

    const categoriesCount = CATEGORIES.filter(item => item.id === id).length;

    const eventsFiltered = index ? eventsByCategory.filter((_item, _index) => {
        return _index % categoriesCount === (index - 1);
    }) : eventsByCategory;

    return (
        <Column>
            <Title>{name}</Title>
            <List>
                {(eventsFiltered.map((item) => {
                    return <News model={item} key={item.id}
                                 onRemoveClick={() => removeNews(item.id)}/>
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
    min-width: 500px;

    @media (max-height: 900px) {
        overflow-y: hidden;
        min-width: 0;
    }
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