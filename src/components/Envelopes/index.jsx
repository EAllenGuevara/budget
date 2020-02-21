import React from 'react'

export default function Envelopes(props) {
    function handleDrop(target, e) {
        e.preventDefault();
        props.onDrop(target, e.dataTransfer.getData('text'));
    }

    const envelopes = props.envelopes.map((envelope) => 
        <tr key={envelope.id} onDragOver={e => e.preventDefault()} onDrop={e => { handleDrop(envelope, e) }}>
            <td>{envelope.name}</td>
            <td>{envelope.amount}</td>
        </tr>
    );

    return <table className="table table-striped"><tbody>{envelopes}</tbody></table>;
}