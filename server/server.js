const express = require('express');
const path = require('path');
const server = express();
const enrouten = require('express-enrouten')

const port = parseInt(process.env.PORT, 10) || 3000

// api
server.use('/api', enrouten({ directory: 'api'}))

// static
server.use(express.static(path.join(__dirname, '../build')));
server.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

server.listen(port, (err) => {
  if (err) throw err
  console.log(`> Ready on port:${port}`)
})