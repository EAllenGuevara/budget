import React, { useReducer } from 'react';

//bootstrap
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';

import { BUDGET_MODAL_CONSTANTS } from './constants';

//child components
import FundingModal from './components/FundingModal';
import SweepModal from './components/SweepModal';
import TransferModal from './components/TransferModal';

/**
 * Component to display and update envelopes
 * @param {Object} props 
 */
export default function Envelopes(props) {
    const initialState = {
        showFundingModal: false,
        showSweepModal: false,
        showTransferModal: false,
        showAddModal: false,
        showDeleteModal: false,
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    function reducer(state, action) {
        switch(action.type) {
            case BUDGET_MODAL_CONSTANTS.TOGGLE_FUNDING_MODAL:
                return {...state, showFundingModal: !state.showFundingModal};
            case BUDGET_MODAL_CONSTANTS.TOGGLE_SWEEP_MODAL:
                return {...state, showSweepModal: !state.showSweepModal};
            case BUDGET_MODAL_CONSTANTS.TOGGLE_TRANSFER_MODAL:
                return {...state, showTransferModal: !state.showTransferModal};
            case BUDGET_MODAL_CONSTANTS.TOGGLE_ADD_MODAL:
                return {...state, showAddModal: !state.showAddModal};
            case BUDGET_MODAL_CONSTANTS.TOGGLE_DELETE_MODAL:
                return {...state, showDeleteModal: !state.showDeleteModal};
            default:
                return initialState;
        }
    }
    /**
     * Prevents default drop behavior and passes data back up to parent drop event handler
     * @param {Object} target - The target envelope for the transaction being dropped 
     * @param {Object} e - event object containing id of the dropped transaction
     */
    function handleDrop(target, e) {
        e.preventDefault();
        props.onDrop(target, e.dataTransfer.getData('text'));
    }

    function handleModalClose(type, updatedEnvelopes) {
        //only update if data passed
        if(updatedEnvelopes) {
            props.onFunding(updatedEnvelopes);
        }

        dispatch({type: type, value: false})
    }

    const envelopes = props.envelopes.map((envelope) => 
        <tr key={envelope.id} onDragOver={e => e.preventDefault()} onDrop={e => { handleDrop(envelope, e) }}>
            <td>{envelope.name}</td>
            <td className={envelope.amount < 0 ? 'text-danger':''}>{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(envelope.amount)}</td>
        </tr>
    );
    
    return <>
        <ButtonToolbar>
            <Button variant="success" size="sm" onClick={() => dispatch({type: BUDGET_MODAL_CONSTANTS.TOGGLE_FUNDING_MODAL, value: true})}>Fund</Button>
            <Button variant="outline-secondary" size="sm" onClick={() => dispatch({type: BUDGET_MODAL_CONSTANTS.TOGGLE_SWEEP_MODAL, value: true})}>Sweep</Button>
            <Button variant="outline-secondary" size="sm" onClick={() => dispatch({type: BUDGET_MODAL_CONSTANTS.TOGGLE_TRANSFER_MODAL, value: true})}>Transfer</Button>
            <Button variant="outline-secondary" size="sm">Add</Button>
            <Button variant="outline-secondary" size="sm">Delete</Button>
        </ButtonToolbar>
        {state.showFundingModal &&
           <FundingModal show={true} envelopes={props.envelopes} onHide={handleModalClose}></FundingModal> 
        }
        {state.showSweepModal &&
           <SweepModal show={true} envelopes={props.envelopes} onHide={handleModalClose}></SweepModal> 
        }
        {state.showTransferModal &&
           <TransferModal show={true} envelopes={props.envelopes} onHide={handleModalClose}></TransferModal> 
        }        
        <table className="table table-striped">
            <tbody>
                {envelopes}
            </tbody>
        </table>
        </>;
}