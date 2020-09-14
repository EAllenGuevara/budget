const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
// const logger = require('morgan');

const API_PORT = 3001;
const app = express();

//provide access to .env variables
dotenv.config();
console.log(process.env.DB_ROUTE);

// connects our back end code with the database
mongoose.connect(process.env.DB_ROUTE, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// app.use(logger('dev'));
app.use(cors());
app.use(express.json());

//routes
const accountsRouter = require('./routes/accounts');
const envelopesRouter = require('./routes/envelopes');
const transactionsRouter = require('./routes/transactions');

app.use('/accounts', accountsRouter);
app.use('/envelopes', envelopesRouter);
app.use('/transactions', transactionsRouter);


// append /api for our http requests
// app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
