import React from 'react'

//third party
import Table from 'react-bootstrap/Table';

/**
 * Component to display and update accounts
 * @param {Object} props 
 */
export default function Ledger(props) {
    const accounts = props.accounts.map((account) => 
        <tr key={account._id}>
            <td>{account.name}</td>
            <td className={account.onlineBalance < 0 ? 'text-danger':''}>{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(account.onlineBalance)}</td>
            <td className={account.registerBalance < 0 ? 'text-danger':''}>{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(account.registerBalance)}</td>
        </tr>
    );

    return <Table striped >
            <tbody>
                <tr>
                    <th>Account Name</th>
                    <th>Online Balance</th>
                    <th>Register Balance</th>
                </tr>
                {accounts}
            </tbody>
        </Table>;
}