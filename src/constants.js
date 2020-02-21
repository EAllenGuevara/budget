export const INITIAL_STATE = {
    envelopes: [
        {
            id: 1,
            name: 'Rent',
            amount: 0,
            accountId: 1
        },
        {
            id: 2,
            name: 'Electric',
            amount: 121,
            accountId: 1
        },
        {
            id: 3,
            name: 'Water',
            amount: 100,
            accountId: 1
        },
        {
            id: 4,
            name: 'Miscellaneous',
            amount: 250,
            accountId: 2
        },
    ],
    transactions: [
        {
            id: 1,
            name: 'Rent payment',
            amount: 1400,
            accountId: 1
        },
        {
            id: 2,
            name: 'Electric bill payment',
            amount: 121,
            accountId: 1
        },
        {
            id: 3,
            name: 'Water bill payment',
            amount: 100,
            accountId: 1
        },
        {
            id: 4,
            name: 'Grocery',
            amount: 130,
            accountId: 2
        },
    ],
    accounts: [
        {
            id: 1,
            name: 'Checking',
            amount: 1400,
            accountId: 1
        },
        {
            id: 2,
            name: 'Savings',
            amount: 121,
            accountId: 1
        },
        {
            id: 3,
            name: 'Credit card',
            amount: -100,
            accountId: 1
        },
    ],
}