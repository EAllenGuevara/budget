// import { SYSTEM_ENVELOPES } from './components/Envelopes/constants';

export const INITIAL_STATE = {
    envelopes: [],
    envelopesLoaded: false,
    transactions: {
        newTransactions: [],
        pendingTransactions: [],
    },
    transactionsLoaded: false,
    accounts: [],
    accountsLoaded: false,
}

export const ENDPOINTS = {
    server: 'http://localhost:3001/',
    envelopes: 'http://localhost:3001/envelopes/',
    transactions: 'http://localhost:3001/transactions/',
    accounts: 'http://localhost:3001/accounts/',
}

// export const INITIAL_STATE = {
//     envelopes: [
//         {
//             id: '0',
//             name: SYSTEM_ENVELOPES.CASH_POOL,
//             amount: 2154.77,
//             accountId: '1',
//             systemEnvelope: true
//         },
//         {
//             id: '000',
//             name: SYSTEM_ENVELOPES.ACCOUNT_TRANSFERS,
//             amount: 0,
//             accountId: '1',
//             systemEnvelope: true
//         },
//         {
//             id: '00000',
//             name: SYSTEM_ENVELOPES.CREDIT_CARD_PAYMENTS,
//             amount: 0,
//             accountId: '1',
//             systemEnvelope: true
//         },
//         {
//             id: '1',
//             name: 'Rent',
//             amount: 0,
//             accountId: '1',
//             systemEnvelope: false
//         },
//         {
//             id: '2',
//             name: 'Electric',
//             amount: 121,
//             accountId: '1',
//             systemEnvelope: false
//         },
//         {
//             id: '3',
//             name: 'Water',
//             amount: 100,
//             accountId: '1',
//             systemEnvelope: false
//         },
//         {
//             id: '4',
//             name: 'Miscellaneous',
//             amount: 250,
//             accountId: '2',
//             systemEnvelope: false
//         },
//     ],
//     transactions: [
//         {
//             id: '1',
//             date: '06/07/2020',
//             name: 'Rent payment',
//             amount: 1400,
//             type: 'withdrawl',
//             accountId: '1'
//         },
//         {
//             id: '2',
//             date: '06/10/2020',
//             name: 'Electric bill payment',
//             amount: 121,
//             type: 'withdrawl',
//             accountId: '1'
//         },
//         {
//             id: '3',
//             date: '06/07/2020',
//             name: 'Water bill payment',
//             amount: 100,
//             type: 'withdrawl',
//             accountId: '3'
//         },
//         {
//             id: '4',
//             date: '06/08/2020',
//             name: 'Grocery',
//             amount: 130,
//             type: 'withdrawl',
//             accountId: '2'
//         },
//         {
//             id: '5',
//             date: '06/08/2020',
//             name: 'Rewards Check',
//             amount: 215.98,
//             type: 'deposit',
//             accountId: '1'
//         },
//     ],
//     accounts: [
//         {
//             id: '1',
//             name: 'Checking',
//             onlineBalance: 1615.98,
//             registerBalance: 1400
//         },
//         {
//             id: '2',
//             name: 'Savings',
//             onlineBalance: 130,
//             registerBalance: 130
//         },
//         {
//             id: '3',
//             name: 'Credit card',
//             onlineBalance: -100,
//             registerBalance: -100
//         },
//     ],
// }

