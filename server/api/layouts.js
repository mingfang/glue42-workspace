const path = require('path');

module.exports = function (router) {
  router.all('/', function (req, res) {
    const file = path.resolve(__dirname + '/../data/layouts.json');
    res.sendFile(file);
  })
};

