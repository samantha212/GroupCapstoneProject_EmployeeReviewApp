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
      templateUrl: 'views/hair.html',
      controller: 'HairController'
    })
    .when('/hairRating', {
      templateUrl: 'views/hairrating.html',
      controller: 'HairRatingController'
    })
    .when('/strengthsDevs', {
      templateUrl: 'views/strengthsdevelopment.html',
      controller: 'StrengsDevsController'
    })
    .when('/signature', {
      templateUrl: 'views/signature.html',
      controller: 'SignatureController'
    })
    .when('/finalRating', {
      templateUrl: '/views/finalrating.html',
      controller: 'FinalRatingController'
    })
    $locationProvider.html5Mode(true);
}]);
