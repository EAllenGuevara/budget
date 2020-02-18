import React from 'react'

import { DEFAULT_ENVELOPES } from './constants'

export default function Envelopes() {
    function handleDrop(target, e) {
        e.preventDefault()
        console.log('Dropped in: ')
        console.dir(target)
        console.log('with: ')
        console.dir(e.dataTransfer.getData('text'))
    }

    const envelopes = DEFAULT_ENVELOPES.map((envelope) => 
        <tr key={envelope.id} onDragOver={e => e.preventDefault()} onDrop={e => { handleDrop(envelope, e) }}>
            <td>{envelope.name}</td>
            <td>{envelope.amount}</td>
        </tr>
    );

    return <table className="table table-striped"><tbody>{envelopes}</tbody></table>;
}