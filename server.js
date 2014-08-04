var express = require('express');

var server = express();

server.use(express.static(__dirname + '/client'));

server.get('*', function(req, res) {
  res.sendfile('client/index.html');
});

var port = process.env.PORT || 3141;

server.listen(port, function () {
  console.log('Express server listening on port ' + port);
});
