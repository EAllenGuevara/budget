import React, { useState } from 'react';

//bootstrap
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';

//child components
import FundingModal from './components/FundingModal';

/**
 * Component to display and update envelopes
 * @param {Object} props 
 */
export default function Envelopes(props) {
    const [modalShow, setModalShow] = useState(false); 
    /**
     * Prevents default drop behavior and passes data back up to parent drop event handler
     * @param {Object} target - The target envelope for the transaction being dropped 
     * @param {Object} e - event object containing id of the dropped transaction
     */
    function handleDrop(target, e) {
        e.preventDefault();
        props.onDrop(target, e.dataTransfer.getData('text'));
    }

    const envelopes = props.envelopes.map((envelope) => 
        <tr key={envelope.id} onDragOver={e => e.preventDefault()} onDrop={e => { handleDrop(envelope, e) }}>
            <td>{envelope.name}</td>
            <td>{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(envelope.amount)}</td>
        </tr>
    );
    
    return <>
        <ButtonToolbar>
            <Button variant="success" size="sm" onClick={() => setModalShow(true)}>Fund</Button>
            <Button variant="outline-secondary" size="sm">Sweep</Button>
            <Button variant="outline-secondary" size="sm">Transfer</Button>
            <Button variant="outline-secondary" size="sm">Add</Button>
            <Button variant="outline-secondary" size="sm">Delete</Button>
        </ButtonToolbar>
        <FundingModal show={modalShow} envelopes={props.envelopes} onHide={() => setModalShow(false)}></FundingModal>
        <table className="table table-striped">
            <tbody>
                {envelopes}
            </tbody>
        </table>
        </>;
}