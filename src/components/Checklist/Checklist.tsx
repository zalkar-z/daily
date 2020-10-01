import React from 'react';

import './Checklist.css';

interface Props {
  id: string
}

const Checklist: React.FC<Props> = ({ id }) => {
  return (
    <div>
      <p>ID: {id}</p>
      <p>Checklist items here:</p>
    </div>
  )
};

export default Checklist;
