const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    name: { type: String, required: true },
    onlineBalance: { type: Number, required: true },
    registerBalance: { type: Number, required: true },
    transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }]
}, {
    timestamps: true,
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;