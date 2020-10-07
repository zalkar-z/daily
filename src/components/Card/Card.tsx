import React from 'react';
import {Link} from 'react-router-dom';

import './Card.css';

interface Props {
  id: string,
  title: string,
  checklist: Checklist,
}

interface Checklist {
  id: string, 
  title: string,
  todo: string[],
}

const Card: React.FC<Props> = ({ title, checklist }) => {
  const path = "/checklist/".concat(checklist.id);
  return (
    <Link to={path}>
      <div className="Card">
        <p>{title}</p>
      </div>
    </Link>
  )
};

export default Card;
