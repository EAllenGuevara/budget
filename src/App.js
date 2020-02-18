import React from 'react';
import './App.css';

import Envelopes from './components/Envelopes'
import Ledger from './components/Ledger'
import Transactions from './components/Transactions'

function App() {
  return <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <div className="row"><Envelopes /></div>
                <div className="row"><Ledger /></div>
              </div>
              <div className="col-md-9"><Transactions /></div>
            </div>
          </div>;
}

export default App;
