import React from 'react'

export default function Transactions(props) {
    function handleDrag(target, e) {
        e.dataTransfer.setData('text', target.id);
    }

    function getAccountName(accountId) {
        return props.accounts.find(account => account.id === accountId).name;
    }

    const transactions = props.transactions.map((transaction) => {
        // const dateObj = new Date(transaction.date);

            return <tr draggable={true} onDragStart={e => { handleDrag(transaction, e)}} key={transaction.id} item={transaction}>
                <td>{new Intl.DateTimeFormat('en-US').format(new Date(transaction.date))}</td>
                <td>{transaction.name}</td>
                <td>{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(transaction.amount)}</td>
                <td>{transaction.type.replace(/^\w/, c => c.toUpperCase())}</td>
                <td>{getAccountName(transaction.accountId)}</td>
            </tr>;
        }
    );

    return <table className="table table-striped">
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
            </table>;
}