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
  const accountId = req.body.accountId;

  const newTransaction = new Transaction({
      name,
      date,
      amount,
      type,
      accountId,
    });

  newTransaction.save()
    .then(() => res.json('Transaction added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;