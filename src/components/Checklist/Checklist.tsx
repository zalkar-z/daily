import React from 'react';
import Modal from 'react-bootstrap/Modal';

import './Checklist.css';

interface Props {
  id: string,
  show: boolean,
  onHide: Function,
}

const Checklist: React.FC<Props> = ({ id, show, onHide }) => {
  return (
    <div>
      <Modal show={show} onHide={onHide} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title - ID: {id}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>
      </Modal>
    </div>
  )
};

export default Checklist;
