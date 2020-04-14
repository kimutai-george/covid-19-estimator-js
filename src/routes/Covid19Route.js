const express = require('express');

const route = express.Router();


const covid19Ctrl = require('../controllers/Covid19Controller');


route.post('/', covid19Ctrl.postCovid19Data); // post Covid data
route.post('/xml', covid19Ctrl.postCovid19DataXml); // post Covid data
route.get('/logs', covid19Ctrl.getLogs); // get logs
route.get('/', covid19Ctrl.getIndex); // get logs


module.exports = route;