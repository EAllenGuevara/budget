import React, { useState } from 'react';

//bootstrap
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import { PENDING_TRANSACTIONS_CONSTANTS } from '../../constants';
import { TRANSACTION_TYPES } from '../../../../constants';

export default function PendingModal(props) {
    const [selectedDate, setSelectedDate] = useState(() => {
      if(props.transaction) {
        //TODO: set previously selected date
      }
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      //month is zero indexed
      const currentMonthInt = currentDate.getMonth() + 1;
      //month and days need to be 2 digits for input field type date
      const currentMonth = currentMonthInt.length > 1 ? currentMonthInt : `0${currentMonthInt}`;
      const currentDayInt = currentDate.getDate();
      const currentDay = currentDayInt.length > 1 ? currentDayInt : `0${currentDayInt}`;
      return `${currentYear}-${currentMonth}-${currentDay}`;
    });
    const [payee, setPayee] = useState(props.transaction ? props.transaction.name : "");
    const [amount, setAmount] = useState(props.transaction ? props.transaction.amount : 0);
    const [isDeposit, setIsDeposit] = useState(() => {
      if(props.transaction) {
        return props.transaction.type === TRANSACTION_TYPES.DEPOSIT
      }
      return false;
    });
    const [selectedEnvelope, setSelectedEnvelope] = useState(props.transaction ? props.transaction.envelopeId : null);
    const [selectedAccount, setSelectedAccount] = useState(props.transaction ? props.transaction.accountId : null);
    const [notes, setNotes] = useState(props.transaction ? props.transaction.notes : null);

    function cancel() {
        props.onHide(PENDING_TRANSACTIONS_CONSTANTS.TOGGLE_PENDING_MODAL);    
    }

    /**
     * Create new version of envelopes from state and start passing it all
     * the way up to the App component.
     */
    function createPendingTransaction() {
      //TODO: add form validation for payee and amount(>0)
        console.log('new pending transaction');
    }

    const envelopes = props.envelopes.map(envelope => 
      <option key={envelope._id} value={envelope._id}>{envelope.name}</option>
    );

    const accounts = props.accounts.map(account => 
      <option key={account._id} value={account._id}>{account.name}</option>
    );

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
            Pending transaction
        </Modal.Header>
        <Modal.Body>
          {/* ---------------------Date and Name--------------------- */}
          <Form.Row>
            <Form.Group as={Col} controlId="Date">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}/>
            </Form.Group>
            <Form.Group as={Col} controlId="Name">
              <Form.Label>Payee</Form.Label>
              <Form.Control value={payee} onChange={(e) => setPayee(e.target.value)}/>
            </Form.Group>
          </Form.Row>
          {/* ---------------------Amount and Type--------------------- */}
          <Form.Row>
            <Form.Group as={Col} controlId="Amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" value={amount} onChange={(e) => setAmount(e.target.value)}/>
            </Form.Group>
            <Form.Group as={Col} controlId="Deposit">
              <Form.Check type="checkbox" checked={isDeposit} label="Deposit" onChange={(e) => setIsDeposit(e.target.checked)}/>
            </Form.Group>
          </Form.Row>
          {/* ---------------------Envelope and Account--------------------- */}
          <Form.Row>
            <Form.Group as={Col} controlId="Envelope">
              <Form.Label>Envelope</Form.Label>
              <Form.Control as="select" defaultValue={selectedEnvelope} onChange={(e) => setSelectedEnvelope(e.target.value)}>
                <option value={null}>Select envelope</option>
                {envelopes}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="Account">
              <Form.Label>Account</Form.Label>
              <Form.Control as="select" defaultValue={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)}>
                <option value={null}>Select account</option>
                {accounts}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          {/* ---------------------Notes--------------------- */}
          <Form.Row>
            <Form.Group as={Col} controlId="Notes">
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea" rows="2" value={notes} onChange={(e) => setNotes(e.target.value)}/>
            </Form.Group>
          </Form.Row>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="success" size="sm" onClick={createPendingTransaction}>OK</Button>
            <Button variant="light" size="sm" onClick={cancel}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
