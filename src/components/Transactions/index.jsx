import React from 'react'

export default function Transactions(props) {
    function handleDrag(target, e) {
        e.dataTransfer.setData('text', target.id);
    }

    const transactions = props.transactions.map((transaction) => 
        <tr draggable={true} onDragStart={e => { handleDrag(transaction, e)}} key={transaction.id} item={transaction}>
            <td>{transaction.name}</td>
            <td>{transaction.amount}</td>
        </tr>
    );

    return <table className="table table-striped"><tbody>{transactions}</tbody></table>;
}