import React, { useReducer } from 'react'

//third party
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import { PENDING_TRANSACTIONS_CONSTANTS } from './constants';

//child components
import PendingModal from './components/PendingModal';

/**
 * Component to display and edit pending transactions
 * @component
 * @param {Object} props 
 */
function PendingTransactions(props) {
    const initialState = {
      showPendingModal: false,
    };

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
      switch(action.type) {
          case PENDING_TRANSACTIONS_CONSTANTS.TOGGLE_PENDING_MODAL:
              return {...state, showPendingModal: !state.showPendingModal};
          default:
              return initialState;
      }
  }

    /**
     * Matches account id with a name and returns the name as a string
     * @param {Int} accountId - Account id associated with target transaction
     * @returns {String}
     */
    function getAccountName(accountId) {
        return props.accounts.find(account => account._id === accountId).name;
    }

    function getEnvelopeName(envelopeId) {
      return props.envelopes.find(envelope => envelope._id === envelopeId).name;
    }

    function handleModalClose(type, updatedEnvelopes) {
      //only update if data passed
      // if(updatedEnvelopes) {
      //     props.onFunding(updatedEnvelopes);
      // }
      console.log('closing pending modal');

      dispatch({type: type, value: false})
    }

    const pendingTransactions = props.pendingTransactions.map((transaction) => {
      return <tr>
          <td>{new Intl.DateTimeFormat('en-US').format(new Date(transaction.date))}</td>
          <td>{transaction.name}</td>
          <td>{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(transaction.amount)}</td>
          <td>{transaction.type.replace(/^\w/, c => c.toUpperCase())}</td>
          <td>{getEnvelopeName(transaction.envelopeId)}</td>
          <td>{getAccountName(transaction.accountId)}</td>
      </tr>;
    });

    return <>
      <ButtonGroup className="envelope-btns">
        <Button variant="success" size="sm" onClick={() => dispatch({type: PENDING_TRANSACTIONS_CONSTANTS.TOGGLE_PENDING_MODAL, value: true})}>Fund</Button>
      </ButtonGroup>
      {state.showPendingModal &&
          <PendingModal show={true} envelopes={props.envelopes} accounts={props.accounts} onHide={handleModalClose}></PendingModal> 
      }
      <Table striped >
        {pendingTransactions.length < 1 && 
          <caption>No pending transactions</caption>
        }
        <tbody>
            <tr>
                <th>Date</th>
                <th>Payee</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Envelope</th>
                <th>Account</th>
            </tr>
            {pendingTransactions}            
        </tbody>
      </Table>
    </>
}

export default PendingTransactions;