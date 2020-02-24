export const INITIAL_STATE = {
    envelopes: [
        {
            id: '1',
            name: 'Rent',
            amount: 0,
            accountId: '1'
        },
        {
            id: '2',
            name: 'Electric',
            amount: 121,
            accountId: '1'
        },
        {
            id: '3',
            name: 'Water',
            amount: 100,
            accountId: '1'
        },
        {
            id: '4',
            name: 'Miscellaneous',
            amount: 250,
            accountId: '2'
        },
    ],
    transactions: [
        {
            id: '1',
            date: '06/07/2020',
            name: 'Rent payment',
            amount: 1400,
            type: 'withdrawl',
            accountId: '1'
        },
        {
            id: '2',
            date: '06/10/2020',
            name: 'Electric bill payment',
            amount: 121,
            type: 'withdrawl',
            accountId: '1'
        },
        {
            id: '3',
            date: '06/07/2020',
            name: 'Water bill payment',
            amount: 100,
            type: 'withdrawl',
            accountId: '3'
        },
        {
            id: '4',
            date: '06/08/2020',
            name: 'Grocery',
            amount: 130,
            type: 'withdrawl',
            accountId: '2'
        },
        {
            id: '5',
            date: '06/08/2020',
            name: 'Rewards Check',
            amount: 215.98,
            type: 'deposit',
            accountId: '1'
        },
    ],
    accounts: [
        {
            id: '1',
            name: 'Checking',
            onlineBalance: 1400,
            registerBalance: 1400
        },
        {
            id: '2',
            name: 'Savings',
            onlineBalance: 130,
            registerBalance: 130
        },
        {
            id: '3',
            name: 'Credit card',
            onlineBalance: -100,
            registerBalance: -100
        },
    ],
}