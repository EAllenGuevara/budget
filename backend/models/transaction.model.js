const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * envelopeId should only be populated when:
 *  1. When a pending transaction has been created
 *  2. When a transaction has been assigned
 */
const transactionSchema = new Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true },
    accountId: { type: String, required: true },
    envelopeId: { type: String },
    isPending: { type: Boolean },
    notes: { type: String, required: false}
}, {
    timestamps: true,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;