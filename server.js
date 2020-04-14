const express = require('express');

const port = process.env.PORT || 3000;
const cors = require('cors');
const covid19Routes = require('./src/routes/Covid19Route');
const logger = require('./src/logs/logger');

const app = express();

app.use(cors());
app.use(logger);


app.use(express.urlencoded({ extended: false })).use(express.json());

app.use('/api/v1/on-covid-19', covid19Routes);

app.listen(port);

// eslint-disable-next-line no-console
console.log(`API server started on: ${port}`);
