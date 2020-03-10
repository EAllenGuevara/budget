const router = require('express').Router();
let Account = require('../models/account.model');

router.route('/').get((req, res) => {
  Account.find()
    .then(accounts => res.json(accounts))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get account with transactions populated
router.route('/:id').get((req, res) => {
    Account.findById(req.params.id)
    .populate('transactions')  
    .then(accounts => res.json(accounts))
    .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/add').post((req, res) => {
    console.log(req.body);
  const name = req.body.name;
  const onlineBalance = req.body.onlineBalance;
  const registerBalance = req.body.registerBalance;
  const transactions = req.body.transactions;

  const newAccount = new Account({
      name,
      onlineBalance,
      registerBalance,
      transactions,
    });

  newAccount.save()
    .then(() => res.json('Account added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;