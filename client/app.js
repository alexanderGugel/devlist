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

.controller('CouponsController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
  $http({method: 'GET', url: 'api/coupons'}).success(function(data) {
    $scope.coupons = data;
  });

  $scope.filterByCategory = function(category) {
    analytics.track('Filtered by category', {
      category: category
    });
    $scope.query = category;
  };

  $scope.trackFilterByQuery = function() {
    analytics.track('Filtered by query', {
      query: $scope.query
    });
  };
}]);
