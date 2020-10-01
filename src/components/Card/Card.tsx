import React from 'react';
import Checklist from '../Checklist/Checklist';

import './Card.css';

interface Props {
  id: string,
  title: string
}

const Card: React.FC<Props> = ({ id, title }) => {
  const checklistId = '3001';
  return (
    <div>
      <p>ID: {id}</p>
      <p>TITLE: {title}</p>
      <Checklist id={checklistId} />
    </div>
  )
};

export default Card;
