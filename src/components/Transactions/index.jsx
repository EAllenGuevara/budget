import React from 'react'

//third party
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';

/**
 * Component to display and edit transactions
 * @component
 * @param {Object} props 
 */
function Transactions(props) {
    /**
     * Sets transaction id to drag event dataTransfer object
     * @param {Object} target - Transaction to be dragged
     * @param {Object} e - Event object
     */
    function handleDrag(target, e) {
        e.dataTransfer.setData('text', target._id);
    }

    /**
     * Matches account id with a name and returns the name as a string
     * @param {Int} accountId - Account id associated with target transaction
     * @returns {String}
     */
    function getAccountName(accountId) {
        return props.accounts.find(account => account._id === accountId).name;
    }

    const transactions = props.transactions.map((transaction) => {
            return <tr draggable={true} onDragStart={e => { handleDrag(transaction, e)}} key={transaction._id} item={transaction}>
                <td>{new Intl.DateTimeFormat('en-US').format(new Date(transaction.date))}</td>
                <td>{transaction.name}</td>
                <td>{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(transaction.amount)}</td>
                <td>{transaction.type.replace(/^\w/, c => c.toUpperCase())}</td>
                <td>{getAccountName(transaction.accountId)}</td>
            </tr>;
        }
    );

    return <Tabs defaultActiveKey="new">
        <Tab eventKey="new" title="New">
            <Table striped >
                <tbody>
                    <tr>
                        <th>Date</th>
                        <th>Payee</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Account</th>
                    </tr>
                    {transactions}
                </tbody>
            </Table>
        </Tab>
        <Tab eventKey="pending" title="Pending">
            Blarp
        </Tab>
    </Tabs>
    
}

export default Transactions;