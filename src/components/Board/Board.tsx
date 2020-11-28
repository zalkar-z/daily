import React, { ReactElement, useState, useEffect, createRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useGlobal from '../../store';

import { has } from 'lodash';

import List from '../List/List';
import Card from '../Card/Card';

import './Board.css';

interface Props {
  match: object,
  history: object,
}

interface List {
  id: string,
  name: string,
  cards: Array<Card>,
}

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

const Board: React.FC<Props & RouteComponentProps> = ({ match, history }) => {
  const [ modalVisible, setModalVisible ] = useState(false);
  const [globalState, globalActions] = useGlobal();
  const { lists } = globalState;

  const newListNameInput: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>()

  useEffect(() => {
    globalActions.lists.getLists();
  }, []);
  
  useEffect(() => {
    if (has(match, 'params.id')) {
      setModalVisible(true);
    }
  }, [match]);

  function hideChecklist() {
    setModalVisible(false);
    history.push('/');
  };

  function addList(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (newListNameInput.current === null) return;
    if (newListNameInput.current.value.trim().length === 0) return;
    if (e.key !== 'Enter') return;

    const newListName = newListNameInput.current.value;
    globalActions.lists.addList(newListName);

    newListNameInput.current.value = "";
  }

  return (
    <div className="Board">
      {lists.map(
        (list: List): ReactElement => {
          return <List key={list.id} id={list.id} name={list.name} cards={list.cards} />
        }
      )}
      <input
        type="text"
        placeholder="Add new list..."
        autoFocus
        ref={newListNameInput}
        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => addList(e)}
      />
      <Card show={modalVisible} onHide={hideChecklist} />
    </div>
  )
};

export default Board;
