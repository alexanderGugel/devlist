angular.module('app', [])

.run(['$rootScope', function($rootScope) {
  $rootScope.jumpTo = function(id) {
    analytics.track('Jumped to section', {
      section: id
    });
    $('html, body').animate({
      scrollTop: $('#' + id).offset().top
    }, 100);
  };
  $rootScope.track = function() {
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

.controller('CouponsController', ['$scope', '$http', 'debounce', function($scope, $http, debounce) {
  $http({method: 'GET', url: 'api/coupons'}).success(function(data) {
    $scope.coupons = data;
  });

  $scope.filterByCategory = function(category) {
    analytics.track('Filtered by category', {
      category: category
    });
    $scope.query = category;
  };

  $scope.trackFilterByQuery = debounce(function() {
    analytics.track('Filtered by query', {
      query: $scope.query
    });
  }, 500);
}]);
