const fs = require('fs');

const Helper = {

  saveToFile(data, filename) {
    fs.appendFile(filename, `${data}\n`, (err) => {
      if (err) {
        throw new Error('The data could not be saved');
      }
    });
  },

  getTimeInMilliseconds(startTime) {
    const NS_PER_SEC = 1e9; // time in nano seconds
    const timeDifference = process.hrtime(startTime);
    return Math.trunc((timeDifference[0] * NS_PER_SEC + timeDifference[1]) / 500);
  }

};

module.exports = Helper;
