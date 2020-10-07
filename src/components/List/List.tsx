import React, { useEffect, ReactElement, createRef } from 'react';
import useGlobal from '../../store';

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
  const [globalState, globalActions] = useGlobal();
  const newCardNameInput: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>()

  function addCard(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (newCardNameInput.current === null) return;
    if (newCardNameInput.current.value.trim().length === 0) return;
    if (e.key !== 'Enter') return;

    const newCardName = newCardNameInput.current.value;
    globalActions.cards.addCard(id, newCardName);
  }

  return (
    <div className="list">
      <div>
        <strong className="listTitle">{name}</strong>
        {cards.map(
          (card: Card): ReactElement => {
            return <Card key={card.id} id={card.id} title={card.title} checklist={card.checklist} />
          }
        )}
      </div>
      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          placeholder="Add a new card..."
          autoFocus
          ref={newCardNameInput}
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => addCard(e)}
        />
      </div>
    </div>
  )
};

export default List;
