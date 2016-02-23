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
    .when('/hair-rating', {
      templateUrl: 'views/hair-rating.html',
      controller: 'HairRatingController'
    })
    .when('/strengths-devs', {
      templateUrl: 'views/strengths-development.html',
      controller: 'StrengthsDevsController'
    })
    .when('/signature', {
      templateUrl: 'views/signature.html',
      controller: 'SignatureController'
    })
    .when('/final-rating', {
      templateUrl: '/views/final-rating.html',
      controller: 'FinalRatingController'
    })
    $locationProvider.html5Mode(true);
}]);


//POSSIBLY ADD FACTORY LOGIC HERE

app.controller('HomeController', ['$scope', '$http', function($scope, $http){
  $scope.typeField = true;
  $scope.typeSalon = true;

  $scope.empOneTwo = true;
  $scope.empThreePlus = true;
  $scope.empFivePlus = true;
  $scope.empSixPlusAndNoEmpSignature = true;
  $scope.empSeven = true;
  $scope.leaderThreePlus = true;
  $scope.leaderThreeFourFive = true;
  $scope.leaderSixPlus = true;

  $scope.leader = true;

  $scope.directReports = [
    {name: "Joe Black", ReviewStatus: "Emp Submit"},
    {name: "Susan Brown", ReviewStatus: "Leader Saved"},
    {name: "William Oliver", ReviewStatus: "Leader Submit"},
    {name: "Sarah Jones", ReviewStatus: "Ready for Signature"},
    {name: "Roy Patiq", ReviewStatus: "Complete"}
  ]
}]);
