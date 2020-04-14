
const path = require('path');
const helpers = require('./helper');

const requestLogger = (request, response, next) => {
  const { method, url } = request;
  const { statusCode } = response;
  const startTime = process.hrtime();
  const timeInMS = helpers.getTimeInMilliseconds(startTime).toLocaleString();
  const message = `${method}\t\t${url}\t\t${statusCode}\t\t${timeInMS}ms`;
  const filePath = path.join(__dirname, 'audit_logs.txt');

  helpers.saveToFile(message, filePath);
  next();
};

module.exports = requestLogger;
