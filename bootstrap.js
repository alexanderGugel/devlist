var redis = require('./redis');
var coupons = [{
  company: 'New Relic',
  description: '25% Off Your Entire Order Of Regular-Priced Items',
  url: 'http://newrelic.com/',
  createdAt: new Date(),
  extras: 'T-Shirt, curated',
  code: 'biuref'
}, {
  company: 'New Relic',
  description: '25% Off Your Entire Order Of Regular-Priced Items',
  url: 'http://newrelic.com/',
  createdAt: new Date(),
  extras: 'exculsive',
  code: 'fehirfoeri'
}];

var insertCoupon = function (coupon) {
  redis.incr('/coupons/counter', function (err, id) {
    redis.hmset('/coupons/' + id, coupon);
    redis.lpush('/coupons', id);
  });
};

for (var i = 0; i < coupons.length; i++) {
  insertCoupon(coupons[i]);
}
