const router = require('express').Router();
let Transaction = require('../models/transaction.model');

router.route('/').get((req, res) => {
  Transaction.find()
    .then(transactions => res.json(transactions))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const date = req.body.date;
  const amount = req.body.amount;
  const type = req.body.type;
  const isPending = req.body.isPending;
  const accountId = req.body.accountId;
  const notes = req.body.notes;

  const newTransaction = new Transaction({
      name,
      date,
      amount,
      type,
      isPending,
      accountId,
      notes,
    });

  newTransaction.save()
    .then(() => res.json('Transaction added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;