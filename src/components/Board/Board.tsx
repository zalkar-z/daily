import React, { ReactElement } from 'react';
import List from '../List/List';

import './Board.css';

const listIds = ['1001', '1002', '1003', '1004', '1005', '1006'];

const Board: React.FC = () => {
  return (
    <div>
      {listIds.map(
        (id: string): ReactElement => {
          return <List key={id} id={id} />
        }
      )}
    </div>
  )
};

export default Board;
