var app = angular.module('regisreview', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    })
    .when('/map', {
      templateUrl: 'views/map.html',
      controller: 'MapController'
    })
    .when('/finances', {
      templateUrl: 'views/finances.html',
      controller: 'FinancesController'
    })
    .when('/goals', {
      templateUrl: 'views/goals.html',
      controller: 'GoalsController'
    })
    .when('/hair', {
      templateUrl: 'views/HAIR.html',
      controller: 'HairController'
    })
    .when('/hairRating', {
      templateUrl: 'views/hairRating.html',
      controller: 'HairRatingController'
    })
    .when('/strengthsDevs', {
      templateUrl: 'views/strengthsDevelopment.html',
      controller: 'StrengthsDevsController'
    })
    .when('/signature', {
      templateUrl: 'views/signature.html',
      controller: 'SignatureController'
    })
    .when('/finalRating', {
      templateUrl: '/views/finalRating.html',
      controller: 'FinalRatingController'
    })
    $locationProvider.html5Mode(true);
}]);


//POSSIBLY ADD FACTORY LOGIC HERE

app.controller('HomeController', ['$scope', '$http', function($scope, $http){
  //DO STUFF
  //$scope.empOneTwo = true;
  //$scope.empThreePlus = true;
  //$scope.empFivePlus = true;
  //$scope.leaderThreePlus = true;
  //$scope.leaderThreeFourFive = true;
  //$scope.leaderSixPlus = true;
}]);
