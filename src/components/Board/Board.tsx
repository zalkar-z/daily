import React, { ReactElement, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { has } from 'lodash';

import List from '../List/List';
import Checklist from '../Checklist/Checklist';

import './Board.css';

const listIds = ['1001', '1002', '1003', '1004', '1005', '1006'];

interface Props {
  match: object,
  history: object,
}

const Board: React.FC<Props & RouteComponentProps> = ({ match, history }) => {
  const [ modalVisible, setModalVisible ] = useState(false);
  
  useEffect(() => {
    if (has(match, 'params.id')) {
      setModalVisible(true);
    }
  }, [match]);

  function hideChecklist() {
    setModalVisible(false);
    history.push('/');
  };

  return (
    <div className="Board">
      {listIds.map(
        (id: string): ReactElement => {
          return <List key={id} id={id} />
        }
      )}
      <Checklist id="123" show={modalVisible} onHide={hideChecklist} />
    </div>
  )
};

export default Board;
