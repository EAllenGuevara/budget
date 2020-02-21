import React from 'react';
import './App.css';

import { INITIAL_STATE } from './constants'

import Envelopes from './components/Envelopes'
import Ledger from './components/Ledger'
import Transactions from './components/Transactions'

// function App() {
class App extends React.Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  handleTransactionDrop(targetEnvelope, transactionIndex) {
    console.log('App received transcation number ' +transactionIndex+ ' to be assigned to:');
    console.dir(targetEnvelope);
  }

  render() {
    return <div className="container-fluid">
              <div className="row">
                <div className="col-md-3">
                  <div className="row"><Envelopes envelopes={this.state.envelopes} onDrop={this.handleTransactionDrop} /></div>
                  <div className="row"><Ledger accounts={this.state.accounts} /></div>
                </div>
                <div className="col-md-9"><Transactions transactions={this.state.transactions} /></div>
              </div>
            </div>;
  }
}
export default App;
