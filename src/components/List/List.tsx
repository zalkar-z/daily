import React, { ReactElement, createRef } from 'react';
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import useGlobal from '../../store';

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
  const [, globalActions] = useGlobal();
  const newCardNameInput: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>()

  function addCard(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (newCardNameInput.current === null) return;
    if (newCardNameInput.current.value.trim().length === 0) return;
    if (e.key !== 'Enter') return;

    const newCardName = newCardNameInput.current.value;
    globalActions.cards.addCard(id, newCardName);

    newCardNameInput.current.value = "";
  }

  return (
    <div className="list">
      <div>
        <strong className="list-title">{name}</strong>
        {cards.map(
          (card: Card): ReactElement => {
            return (
              <Link key={card.id} to={"/card/".concat(card.id)} onClick={() => globalActions.cards.setActiveCard(card.id)}>
                <div className="card-list-item">
                  <p>{card.title}</p>
                </div>
              </Link>
            )
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

      <Button size="sm" onClick={() => globalActions.lists.deleteList(id)}>Delete this list</Button>
    </div>
  )
};

export default List;
