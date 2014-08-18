angular.module('app', [])

.run(['$rootScope', 'jumpTo', 'track', function($rootScope, jumpTo, track) {
  $rootScope.jumpTo = jumpTo;
  $rootScope.track = track;
}])

.factory('jumpTo', ['track', function(track) {
  return function(id) {
    track('Jumped to section', {
      id: id
    });
    $('html, body').animate({
      scrollTop: $('#' + id).offset().top
    }, 100);
  };
}])

.factory('track', [function() {
  return function() {
    return analytics.track.apply(analytics.track, arguments);
  };
}])

.factory('debounce', ['$timeout', function($timeout) {
  return function debounce(fn, delay) {
    var timer = null;
    return function () {
      var context = this, args = arguments;
      if (timer) $timeout.cancel(timer);
      timer = $timeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  };
}])

.controller('CouponsController', ['$scope', '$http', 'debounce', 'track', function($scope, $http, debounce, track) {
  $http({method: 'GET', url: 'api/coupons'}).success(function(data) {
    $scope.coupons = data;
  });

  $scope.filterByCategory = function(category) {
    track('Filtered by category', {
      category: category
    });
    $scope.query = category;
  };

  $scope.trackFilterByQuery = debounce(function() {
    track('Filtered by query', {
      query: $scope.query
    });
  }, 500);
}]);
