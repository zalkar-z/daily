import React, { ReactElement } from 'react';
import Card from '../Card/Card';

import './List.css';

interface Props {
  id: string
}

interface Card {
  id: string,
  title: string
}

const cards = [{
    id: '2001',
    title: 'Personal Card',
  }, {
    id: '2002',
    title: 'Work Card',
  }
];

const List: React.FC<Props> = ({ id }) => {
  const listTitle = "Monday List";
  return (
    <div className="list">
      <strong className="listTitle">{listTitle}</strong>
      {cards.map(
        (card: Card): ReactElement => {
          return <Card key={card.id} id={card.id} title={card.title} />
        }
      )}
    </div>
  )
};

export default List;
