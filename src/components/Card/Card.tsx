import React, { ReactElement, createRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import useGlobal from '../../store';

interface Props {
  show: boolean,
  onHide: Function,
}

interface Check {
  title: string,
  isComplete: boolean,
}

const Checklist: React.FC<Props> = ({ show, onHide }) => {
  const [globalState, globalActions] = useGlobal();
  const { activeCard } = globalState;
  const { checklist } = activeCard;

  const newChecklistItemInput: React.RefObject<HTMLInputElement> = createRef<HTMLInputElement>();

  function addChecklistItem(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (newChecklistItemInput.current === null) return;
    if (newChecklistItemInput.current.value.trim().length === 0) return;
    if (e.key !== 'Enter') return;

    const newChecklistItem = newChecklistItemInput.current.value;
    globalActions.cards.addChecklistItem(newChecklistItem);
  }

  return (
    <div>
      <Modal show={show} onHide={onHide} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{activeCard.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ul>
            {checklist.map(
              (check: Check): ReactElement => {
                return (
                  <li>{check.title} - {check.isComplete ? 'Complete' : 'Not complete'}</li>
                )
              }
            )}
          </ul>

          <div style={{ marginTop: '10px' }}>
            <input
              type="text"
              placeholder="Add a new card..."
              autoFocus
              ref={newChecklistItemInput}
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => addChecklistItem(e)}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
};

export default Checklist;
