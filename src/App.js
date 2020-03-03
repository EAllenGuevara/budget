import React from 'react';
import './App.css';

//constants
import { INITIAL_STATE } from './constants'
import { TRANSACTION_TYPES } from './components/Transactions/constants'

//components
import Envelopes from './components/Envelopes'
import Ledger from './components/Ledger'
import Transactions from './components/Transactions'

/**
 * Wrapper component that handles global state(for now)
 * @class
 */
class App extends React.Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
    //allows 'this' to be accessed in inner functions
    this.handleTransactionDrop = this.handleTransactionDrop.bind(this);
    this.handleFunding = this.handleFunding.bind(this);
  }

  /**
   * Updates envelopes in the state object after funding
   * @param {Object} updatedEnvelopes - Envelopes with updated amounts from funding modal
   */
  handleFunding(updatedEnvelopes) {
      this.setState(state => {
        return { ...state, envelopes: updatedEnvelopes};
      });    
  }

  /**
   * Updates targeted envelope and account with dropped transaction data
   * and removes transaction from transactions list(updates 'global' state)
   * @param {Object} targetEnvelope - Envelope to be updated
   * @param {Int} transactionId - id of dropped transaction
   */
  handleTransactionDrop(targetEnvelope, transactionId) {
    //get transaction object
    const transactionIndex = this.state.transactions.findIndex(transaction => transaction.id === transactionId);
    const transaction = { ...this.state.transactions[transactionIndex] };
    //update the amount in the envelope
    const updatedEnvelopeAmount = this.updateAmount(parseFloat(targetEnvelope.amount), transaction);
    const updatedEnvelope = {...targetEnvelope, amount: updatedEnvelopeAmount};
    //find affected account and update
    const affectedAccount = this.state.accounts.find(account => account.id === transaction.accountId);
    const updatedAccountBalance = this.updateAmount(parseFloat(affectedAccount.registerBalance), transaction);
    const updatedAccount = {...affectedAccount, registerBalance: updatedAccountBalance};
    //update state
    this.setState((state) => {
      //TODO: add transaction to envelopes so user can see history
      return {
        envelopes: state.envelopes.map(envelope => envelope.id === updatedEnvelope.id ? updatedEnvelope : envelope),
        transactions: state.transactions.filter(transaction => transaction.id !== transactionId),
        accounts: state.accounts.map(account => account.id === updatedAccount.id ? updatedAccount: account)
      };
    });
  }

  /**
   * Adds or subtracts transaction amount from envelope or account balance
   * @param {Float} itemAmount - Envelope or account balance to be updated
   * @param {Object} transaction - Dropped transaction
   * @returns {Float} Amount after transaction applied
   */
  updateAmount(itemAmount, transaction) {
    const transactionAmount = parseFloat(transaction.amount);
    return transaction.type === TRANSACTION_TYPES.WITHDRAWL 
      ? itemAmount - transactionAmount : itemAmount + transactionAmount;
  }

  render() {
    return <div className="container-fluid">
              <div className="row">
                <div className="col-md-3">
                  <div className="row"><Envelopes envelopes={this.state.envelopes} onDrop={this.handleTransactionDrop} onFunding={this.handleFunding}/></div>
                  <div className="row"><Ledger accounts={this.state.accounts} /></div>
                </div>
                <div className="col-md-9"><Transactions transactions={this.state.transactions} accounts={this.state.accounts} /></div>
              </div>
            </div>;
  }
}
export default App;
