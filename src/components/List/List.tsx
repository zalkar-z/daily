import React, { useEffect, ReactElement } from 'react';
import Card from '../Card/Card';

import './List.css';

interface Card {
  id: string,
  title: string,
  checklist: Checklist,
}

interface Checklist {
  id: string, 
  title: string,
  todo: string[],
}
interface Props {
  id: string,
  name: string,
  cards: Array<Card>,
}

const List: React.FC<Props> = ({ id, name, cards }) => {
  const listTitle = "Monday List";

  useEffect(() => {
    console.log(id, name, cards);
  })

  return (
    <div className="list">
      <strong className="listTitle">{name}</strong>
      {cards.map(
        (card: Card): ReactElement => {
          return <Card key={card.id} id={card.id} title={card.title} checklist={card.checklist} />
        }
      )}
    </div>
  )
};

export default List;
