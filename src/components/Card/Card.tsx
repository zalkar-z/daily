import React from 'react';
import {Link} from 'react-router-dom';

import './Card.css';

interface Props {
  id: string,
  title: string
}

const Card: React.FC<Props> = ({ id, title }) => {
  return (
    <Link to="/checklist/12345">
      <div className="Card">
        <p>ID: {id}</p>
        <p>TITLE: {title}</p>
      </div>
    </Link>
  )
};

export default Card;
