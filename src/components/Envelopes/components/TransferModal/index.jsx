import React, { useState } from 'react';

//bootstrap
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { BUDGET_MODAL_CONSTANTS } from '../../constants';

export default function TransferModal(props) {
    const [fromEnvelope, setFromEnvelope] = useState({});
    const [toEnvelope, setToEnvelope] = useState({});
    const [toEnvelopes, setToEnvelopes] = useState([]);
    //must initialize controlled number input to something to avoid 'uncontrolled to controlled' error
    const [transferAmount, setTransferAmount] = useState('');
    const [entireBalance, setEntireBalance] = useState(false);
    
    //filter out system envelopes and create mutable copy of array
    const fromEnvelopes = props.envelopes
        .filter((envelope) => !envelope.systemEnvelope)
        .map((envelope) =><option key={envelope._id} value={envelope._id}>{envelope.name}</option>);

    function cancel() {
        props.onHide(BUDGET_MODAL_CONSTANTS.TOGGLE_TRANSFER_MODAL);    
    }

    function handleEntireBalance(e) {
        setEntireBalance(e.target.checked);
        const balance = e.target.checked ? fromEnvelope.amount : 0;
        setTransferAmount(balance);
    }

    function handleFromChange(e) {
        setFromEnvelope(props.envelopes.find((env) => env._id === e.target.value));
        //must filter based on dom key attr here
        setToEnvelopes(fromEnvelopes.filter((env) => env.key !== e.target.value));
    }

    function handleToChange(e) {
        setToEnvelope(props.envelopes.find((env) => env._id === e.target.value));
    }

    /**
     * Create new version of envelopes from state and start passing it all
     * the way up to the App component.
     */
    function transferFunds() {
        const updatedEnvelopes = [...props.envelopes];
        //update from envelope amount
        const fromEnvIndex = updatedEnvelopes.findIndex((env) => env._id === fromEnvelope._id);
        updatedEnvelopes[fromEnvIndex].amount -= transferAmount;
        //update to envelope amount
        const toEnvIndex = updatedEnvelopes.findIndex((env) => env._id === toEnvelope._id);
        updatedEnvelopes[toEnvIndex].amount += transferAmount;
        
        props.onHide(BUDGET_MODAL_CONSTANTS.TOGGLE_TRANSFER_MODAL, updatedEnvelopes);
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
            Envelope Transfer
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Transfer From:</Form.Label>
                    <Form.Control as="select" onChange={handleFromChange}>
                        <option value={{}}></option>
                        {fromEnvelopes}
                    </Form.Control>
                </Form.Group>
                <h6>Current Balance: {fromEnvelope.amount}</h6>
                <h6>Balance After Transfer: {fromEnvelope.amount - transferAmount}</h6>
                <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label>To:</Form.Label>
                    <Form.Control as="select" onChange={handleToChange}>
                        <option value={null}></option>
                        {toEnvelopes}
                    </Form.Control>
                </Form.Group>
                <h6>Current Balance: {toEnvelope.amount}</h6>
                <h6>Balance After Transfer: {toEnvelope.amount + transferAmount}</h6>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Amount:</Form.Label>
                    <Form.Control type="number" disabled={entireBalance} value={transferAmount} onChange={(e) => setTransferAmount(parseFloat(e.target.value))}/>
                </Form.Group>                
                <Form.Group id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Apply Entire Balance" onChange={handleEntireBalance} disabled={!fromEnvelope.amount} />
                </Form.Group>
            </Form>
        
        </Modal.Body>
        <Modal.Footer>
            <Button variant="success" size="sm" onClick={transferFunds} >Transfer</Button>
            <Button variant="light" size="sm" onClick={cancel}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }

