import React from 'react';

//bootstrap
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { BUDGET_MODAL_CONSTANTS } from '../../constants';

export default function SweepModal(props) {
    function cancel() {
        props.onHide(BUDGET_MODAL_CONSTANTS.TOGGLE_SWEEP_MODAL);    
    }

    /**
     * Create new version of envelopes from state and start passing it all
     * the way up to the App component.
     */
    function sweepFunds() {
        console.log('sweep funds');
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
            Envelope Sweep
        </Modal.Header>
        <Modal.Body>
            <p>Sweep modalbody</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="success" size="sm" onClick={sweepFunds} >Sweep</Button>
            <Button variant="light" size="sm" onClick={cancel}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
