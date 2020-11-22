import React, { ReactElement, createRef } from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
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
          <ul style={{ listStyleType: 'none', padding: '0' }}>
            {checklist.map(
              (check: Check, index: number): ReactElement => {
                return (
                  <li>
                    <Row>
                      <Col md="2">
                        <Form>
                          <Form.Group controlId="todoCheckbox">
                            <Form.Check 
                              type="checkbox" 
                              checked={check.isComplete}
                              onChange={(e: any) => globalActions.cards.updateChecklistItem(index, e.target.checked)} />
                          </Form.Group>
                        </Form>
                      </Col>
                      <Col>
                        <span>{check.title} - {check.isComplete ? 'Complete' : 'Not complete'}</span>
                      </Col>
                      <Col>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => globalActions.cards.deleteChecklistItem(index)}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </li>
                )
              }
            )}
          </ul>

          <div style={{ marginTop: '10px' }}>
            <input
              type="text"
              placeholder="Add a new task..."
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
