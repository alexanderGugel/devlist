$(function() {
  // Smooth scrolling
  // http://css-tricks.com/snippets/jquery/smooth-scrolling/
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

angular.module('app', [])

.controller('CouponsController', ['$scope', '$http', function($scope, $http) {
  $http({method: 'GET', url: 'api/coupons'}).success(function(data) {
    console.log(data);
    $scope.coupons = data;
  });

  $scope.filterByCategory = function(category) {
    $scope.query = category;
  };
}]);
