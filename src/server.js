require('dotenv').config()
require('./db')
require('./mongodb')

const process = require('process');
const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const signale = require('signale');

const app = express();

const port = process.env.PORT || 5001;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(port, () => {
  signale.success(`server listens to port ${port}`);
});
