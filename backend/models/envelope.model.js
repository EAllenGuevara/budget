const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const envelopeSchema = new Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    systemEnvelope: { type: Boolean, default: false, required: false },
    transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }]
}, {
    timestamps: true,
});

const Envelope = mongoose.model('Envelope', envelopeSchema);

module.exports = Envelope;