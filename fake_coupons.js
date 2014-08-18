var redis = require('./redis');

var fs = require('fs');

var words = fs.readFileSync('/usr/share/dict/words', {
    encoding: 'utf8'
}).split('\n');

var randomWord = function() {
  return words[Math.floor(Math.random() * words.length)];
};

var genFakeCoupon = function() {
  return {
    company: randomWord() + ' ltd.',
    description: Math.floor(Math.random() * 100) + '% Off ' + randomWord(),
    url: 'http://' + randomWord() + '.com/login',
    favicon: 'http://newrelic.com/favicon.ico',
    createdAt: new Date(),
    code: randomWord().toUpperCase() + 'DEVLIST',
    category: randomWord()
  };
};

var insertCoupon = function (coupon) {
  redis.incr('/coupons/counter', function (err, id) {
    coupon.id = id;
    redis.hmset('/coupons/' + id, coupon);
    redis.lpush('/coupons', id);
  });
};

for (var j = 0; j < 100; j++) {
  insertCoupon(genFakeCoupon());
}

redis.quit();
