const router = require('express').Router();
let Envelope = require('../models/envelope.model');

router.route('/').get((req, res) => {
  Envelope.find()
    .then(envelopes => res.json(envelopes))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get envelope with transactions populated
router.route('/:id').get((req, res) => {
    Envelope.findById(req.params.id)
    .populate('transactions')  
    .then(envelope => res.json(envelope))
    .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const amount = req.body.amount;
  const transactions = req.body.transactions;

  const newEnvelope = new Envelope({
      name,
      amount,
      transactions,
    });

  newEnvelope.save()
    .then(() => res.json('Envelope added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;