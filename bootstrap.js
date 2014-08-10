var redis = require('./redis');
var coupons = [{
  company: 'New Relic',
  description: '25% Off Your Entire Order Of Regular-Priced Items',
  url: 'http://newrelic.com/',
  favicon: 'http://newrelic.com/favicon.ico',
  createdAt: new Date(),
  code: 'biuref',
  category: 'analytics'
}];

var insertCoupon = function (coupon) {
  redis.incr('/coupons/counter', function (err, id) {
    redis.hmset('/coupons/' + id, coupon);
    redis.lpush('/coupons', id);
  });
};

for (var j = 0; j < 100; j++) {
  for (var i = 0; i < coupons.length; i++) {
    insertCoupon(coupons[i]);
  }
}
