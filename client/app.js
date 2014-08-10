angular.module('app', [])

.controller('CouponsController', ['$scope', '$http', function($scope, $http) {
  $http({method: 'GET', url: 'api/coupons'}).success(function(data) {
    console.log(data);
    $scope.coupons = data;
  });
}]);
