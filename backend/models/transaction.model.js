const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true },
    accountId: { type: String, required: true },
    isPending: { type: Boolean },
    notes: { type: String, required: false}
}, {
    timestamps: true,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;