var express = require('express'),
    redis = require('./redis');

var server = express();

server.get('/', function(req, res) {
  res.redirect('/launch');
});

server.get('/launch', function(req, res) {
  res.sendfile('client/launch.html');
});

server.use(express.static(__dirname + '/client'));

server.get('/api/coupons', function (req, res) {
  redis.lrange('/coupons', 0, -1, function (err, ids) {
    var multi = redis.multi();
    for (var i = 0; i < ids.length; i++) {
      multi.hgetall('/coupons/' + ids[i]);
    }
    multi.exec(function (err, coupons) {
      res.send(coupons);
    });
  });
});

server.get('/alpha', function(req, res) {
  res.sendfile('client/index.html');
});

server.get('*', function(req, res) {
  res.redirect('/');
});

var port = process.env.PORT || 3141;

server.listen(port, function () {
  console.log('Express server listening on port ' + port);
});
