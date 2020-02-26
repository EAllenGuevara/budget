import React from 'react';

//bootstrap
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

export default function FundingModal(props) {
    //filter out system envelopes and create mutable copy of array
    const eligibleEnvelopes = props.envelopes.filter(envelope => !envelope.systemEnvelope);

    const fundingEnvelopes = eligibleEnvelopes.map((envelope) =>
            <tr key={envelope.id}>
                <td>{envelope.name}</td>
                <td>{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(envelope.amount)}</td>
                <td><Form.Control size="sm" type="text" placeholder="0.00" /></td>
            </tr>
    );

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
            Envelope Funding
        </Modal.Header>
        <Modal.Body>
          <table className="table table-striped table-sm">
            <tbody>
                <tr>
                    <th>Envelope</th>
                    <th>Current Balance</th>
                    <th>Amount to be Funded</th>
                </tr>
                {fundingEnvelopes}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="success" size="sm">Fund</Button>
            <Button variant="light" size="sm" onClick={props.onHide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }

