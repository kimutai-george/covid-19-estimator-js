/* eslint-disable indent */
const Easyxml = require('easyxml');
const fs = require('fs');
const path = require('path');
const estimate = require('../estimator');

const serializer = new Easyxml({
    singularize: true,
    rootElement: 'response',
    dateFormat: 'ISO',
    manifest: true
});


exports.postCovid19Data = (req, res) => {
    const data = req.body;

    const estimation = estimate(data);


    return res.status(200).json(estimation);
};


exports.postCovid19DataXml = (req, res) => {
    const data = req.body;

    const estimation = estimate(data);
    const estimationDoc = serializer.render(estimation);

    return res.status(200).set('Content-Type', 'text/xml').send(estimationDoc);
};

exports.getLogs = (req, res) => {
    const filePath = path.join(__dirname, '../Alogs/audit_logs.txt');
    fs.readFile(filePath, 'utf8', (err, data) => {
        // eslint-disable-next-line no-console
        if (err) console.log(err);
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.write(data);
        res.end();
    });
};
