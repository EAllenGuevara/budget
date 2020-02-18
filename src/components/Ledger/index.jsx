import React from 'react'

import { DEFAULT_ACCOUNTS } from './constants'

export default function Ledger() {
    const accounts = DEFAULT_ACCOUNTS.map((account) => 
        <tr key={account.id}>
            <td>{account.name}</td>
            <td>{account.amount}</td>
        </tr>
    );

    return <table className="table table-striped"><tbody>{accounts}</tbody></table>;
}