var redis = require('./redis');
var genFakeCoupon = function() {
  return {
    company: Math.floor(Math.random()*100) + ' New Relic',
    description: Math.floor(Math.random()*100) + '% Off Your Entire Order Of Regular-Priced Items',
    url: 'http://newrelic.com/' + Math.floor(Math.random()*100),
    favicon: 'http://newrelic.com/favicon.ico',
    createdAt: new Date(),
    code: 'biuref ' + Math.floor(Math.random()*100),
    category: 'analytics ' + Math.floor(Math.random()*100)
  };
};

var insertCoupon = function (coupon) {
  redis.incr('/coupons/counter', function (err, id) {
    redis.hmset('/coupons/' + id, coupon);
    redis.lpush('/coupons', id);
  });
};

for (var j = 0; j < 100; j++) {
  insertCoupon(genFakeCoupon());
}
