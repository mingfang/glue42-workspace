const path = require('path');
module.exports = function (router) {
  router.all('/', function (req, res) {
    console.log('search')
    const file = path.resolve(__dirname + '/../../../data/applications.json');
    res.sendFile(file);
  });
};

