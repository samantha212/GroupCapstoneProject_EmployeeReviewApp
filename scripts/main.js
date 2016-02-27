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

  var employeeId;
  //gets the users token, change the number from 1-5 to get different users
  $http.get('token/1').then(function(response){
    console.log(response.data);
    employeeId = {regisId: response.data.regisId};

    //gives you the clients own review and information
    $http.post('/employeeData', employeeId).then(function(response){
      var employeeData = response.data;
      console.log(response.data, 'client information and review');
    });

    //gives you all of the reviews the leader needs to review
    //Currently you will be given wayyyyy too much properties but we haven't removed those properties before sending them up yet, but you will still be able to work with this data the same.
    $http.post('/employeeData/leaderReviews', employeeId).then(function(response){
      //we still need to send up the employees information object, but that isnt an immediate need.  If you're confused about what employee you want to target look in the database and compare the Id column in the employeeData table with the EmployeeId column in the Subsection table.
      console.log(response.data, 'clients employees reviews');

      //This is the map view call, put this where you need it
      //In an object send down the employeeId of the employee you would like to get the current map view information of.
      //Id in the employee information object is the same Id as EmployeeId in the other objects, match the two to know who you are dealing with
      //The 2 in this object is the employee review with the id of 2, once you start getting the client logic running you will want this objects id value to be dynamic to which review you click on, but for now we decided to hard code the employee with the id of 2
      var giveMeThisEmployeesMapView = {Id: 2}
      $http.post('/getmapview', giveMeThisEmployeesMapView).then(function(response){
        console.log(response, 'map view logic');
      });
    });

  });


  $scope.directReports = [
    {name: "Joe Black", ReviewStatus: "Emp Submit"},
    {name: "Susan Brown", ReviewStatus: "Leader Saved"},
    {name: "William Oliver", ReviewStatus: "Leader Submit"},
    {name: "Sarah Jones", ReviewStatus: "Ready for Signature"},
    {name: "Roy Patiq", ReviewStatus: "Complete"}
  ]
}]);
