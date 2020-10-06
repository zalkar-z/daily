import React, { ReactElement, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useGlobal from '../../store';

import { has } from 'lodash';

import List from '../List/List';
import Checklist from '../Checklist/Checklist';

import './Board.css';

interface Props {
  match: object,
  history: object,
}

const Board: React.FC<Props & RouteComponentProps> = ({ match, history }) => {
  const [ modalVisible, setModalVisible ] = useState(false);
  const [globalState, globalActions] = useGlobal();
  const { lists } = globalState;

  useEffect(() => {
    globalActions.lists.getLists();
  }, []);

  useEffect(() => {
    console.log(lists);
  }, [lists])
  
  useEffect(() => {
    if (has(match, 'params.id')) {
      setModalVisible(true);
    }
  }, [match]);

  function hideChecklist() {
    setModalVisible(false);
    history.push('/');
  };

  if (lists.length == 0) {
    return (
      <div>
        <strong>You do not have any lists here...</strong>
      </div>
    )
  }

  return (
    <div className="Board">
      {lists.map(
        (id: string): ReactElement => {
          return <List key={id} id={id} />
        }
      )}
      <Checklist id="123" show={modalVisible} onHide={hideChecklist} />
    </div>
  )
};

export default Board;
