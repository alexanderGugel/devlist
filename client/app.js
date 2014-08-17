angular.module('app', [])

.run(['$rootScope', function($rootScope) {
  $rootScope.scrollTo = function(id) {
    $('html, body').animate({
      scrollTop: $('#' + id).offset().top
    }, 100);
  };
}])

.controller('CouponsController', ['$scope', '$http', '$anchorScroll', '$timeout', function($scope, $http) {
  $http({method: 'GET', url: 'api/coupons'}).success(function(data) {
    $scope.coupons = data;
  });

  $scope.filterByCategory = function(category) {
    $scope.query = category;
  };
}]);
