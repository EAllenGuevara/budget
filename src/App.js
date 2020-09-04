import React from 'react';
import './App.css';

//third party
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

//constants
import { INITIAL_STATE, ENDPOINTS } from './constants'
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
    this.setOthers = this.setOthers.bind(this);
  }

  componentDidMount() {
    //transactions depend on account so be sure to get account data first
    fetch(ENDPOINTS.accounts)
      .then((data) => data.json())
      .then((res) => {
          this.setState(state => {
            return { ...state, accounts: res, accountsLoaded: true}
          });
          //now get transaction and envelope data
          axios.all([
            axios.get(ENDPOINTS.transactions),
            axios.get(ENDPOINTS.envelopes)
          ])
          .then(axios.spread(this.setOthers));
        }
      );
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
    const transactionIndex = this.state.transactions.findIndex(transaction => transaction._id === transactionId);
    const transaction = { ...this.state.transactions[transactionIndex] };
    //update the amount in the envelope
    const updatedEnvelopeAmount = this.updateAmount(parseFloat(targetEnvelope.amount), transaction);
    const updatedEnvelope = {...targetEnvelope, amount: updatedEnvelopeAmount};
    //find affected account and update
    const affectedAccount = this.state.accounts.find(account => account._id === transaction.accountId);
    const updatedAccountBalance = this.updateAmount(parseFloat(affectedAccount.registerBalance), transaction);
    const updatedAccount = {...affectedAccount, registerBalance: updatedAccountBalance};
    //update state
    this.setState((state) => {
      //TODO: add transaction to envelopes so user can see history
      return {
        ...state,
        envelopes: state.envelopes.map(envelope => envelope._id === updatedEnvelope._id ? updatedEnvelope : envelope),
        transactions: state.transactions.filter(transaction => transaction._id !== transactionId),
        accounts: state.accounts.map(account => account._id === updatedAccount._id ? updatedAccount: account)
      };
    });
  }

  setOthers(transactionsResponse, envelopesResponse) {
    this.setState(state => {
      return {
        ...state,
        transactions: transactionsResponse.data,
        transactionsLoaded: true,
        envelopes: envelopesResponse.data,
        envelopesLoaded: true,
      }
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
    return transaction.type === TRANSACTION_TYPES.WITHDRAWAL
      ? itemAmount - transactionAmount : itemAmount + transactionAmount;
  }

  render() {
    return <>
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="#home">Budget app</Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Budget</Nav.Link>
                <Nav.Link href="#pricing">Accounts</Nav.Link>
              </Nav>
            </Navbar>
            <Container className="main-wrap" fluid>
              <Row noGutters>
                <Col md={3} className="envelopes-ledger-wrap">
                  <Row className="envelopes-wrap" noGutters>
                    <Envelopes envelopes={this.state.envelopes} onDrop={this.handleTransactionDrop} onFunding={this.handleFunding}/>
                  </Row>
                  <Row noGutters><Ledger accounts={this.state.accounts} /></Row>
                </Col>
                <Col md={9}>
                  <Transactions transactions={this.state.transactions} accounts={this.state.accounts} />
                </Col>
              </Row>
            </Container>
  </>
  }
}
export default App;
