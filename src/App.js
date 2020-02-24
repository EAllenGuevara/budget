import React from 'react';
import './App.css';
//constants
import { INITIAL_STATE } from './constants'
import { TRANSACTION_TYPES } from './components/Transactions/constants'
//components
import Envelopes from './components/Envelopes'
import Ledger from './components/Ledger'
import Transactions from './components/Transactions'

// function App() {
class App extends React.Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
    //allows 'this' to be accessed in inner functions
    this.handleTransactionDrop = this.handleTransactionDrop.bind(this);
  }

  handleTransactionDrop(targetEnvelope, transactionId) {
    //get transaction object
    const transactionIndex = this.state.transactions.findIndex(transaction => transaction.id === transactionId);
    const transaction = { ...this.state.transactions[transactionIndex] };
    //update the amount in the envelope
    const updatedEnvelope = this.updateEnvelope({...targetEnvelope}, transaction);
    //find affected account and update
    const affectedAccount = this.state.accounts.find(account => account.id === transaction.accountId);
    const updatedAccount = this.updateLedger({...affectedAccount}, transaction);
    //update state
    this.setState((state) => {
      //TODO: add transaction to envelopes so user and see history
      return {
        envelopes: state.envelopes.map(envelope => envelope.id === updatedEnvelope.id ? updatedEnvelope : envelope),
        transactions: state.transactions.filter(transaction => transaction.id !== transactionId),
        accounts: state.accounts.map(account => account.id === updatedAccount.id ? updatedAccount: account)
      };
    });
  }

  updateEnvelope(envelope, transaction) {
    const envelopeAmount = parseFloat(envelope.amount);
    const transactionAmount = parseFloat(transaction.amount);
    envelope.amount = transaction.type === TRANSACTION_TYPES.WITHDRAWL 
      ? envelopeAmount - transactionAmount : envelopeAmount + transactionAmount;
    return envelope;
  }

  updateLedger(account, transaction) {
    const envelopeAmount = parseFloat(transaction.amount);
    const accountRegisterBalance = parseFloat(account.registerBalance);
    account.registerBalance = transaction.type === TRANSACTION_TYPES.WITHDRAWL 
      ? accountRegisterBalance - envelopeAmount : accountRegisterBalance + envelopeAmount;
    return account;
  }

  render() {
    return <div className="container-fluid">
              <div className="row">
                <div className="col-md-3">
                  <div className="row"><Envelopes envelopes={this.state.envelopes} onDrop={this.handleTransactionDrop} /></div>
                  <div className="row"><Ledger accounts={this.state.accounts} /></div>
                </div>
                <div className="col-md-9"><Transactions transactions={this.state.transactions} accounts={this.state.accounts} /></div>
              </div>
            </div>;
  }
}
export default App;
