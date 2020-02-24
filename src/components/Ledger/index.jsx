import React from 'react'

export default function Ledger(props) {
    const accounts = props.accounts.map((account) => 
        <tr key={account.id}>
            <td>{account.name}</td>
            <td>{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(account.onlineBalance)}</td>
            <td>{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(account.registerBalance)}</td>
        </tr>
    );

    return <table className="table table-striped">
            <tbody>
                <tr>
                    <th>Account Name</th>
                    <th>Online Balance</th>
                    <th>Register Balance</th>
                </tr>
                {accounts}
            </tbody>
        </table>;
}