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
    });
    $locationProvider.html5Mode(true);
}]);



app.controller('HomeController', ['$scope', '$http', function($scope, $http){

  $scope.typeField = true;
  $scope.typeSalon = true;

  $scope.empOneTwo = true;
  $scope.empOneToFive = true;
  $scope.empThreePlus = true;
  $scope.empFivePlus = true;
  $scope.empSix = true;
  $scope.empSixAndNoEmpSignature = true;
  $scope.empSeven = true;
  $scope.leaderThreePlus = true;
  $scope.leaderThreeFour = true;
  $scope.leaderThreeFourFive = true;
  $scope.leaderFive = true;
  $scope.leaderSix = true;
  $scope.leaderSixPlus = true;

  $scope.leader = true;
  $scope.emp = false;

  var employeeId;
  //gets the users token, change the number from 1-5 to get different users
  //Revisit this to make it dynamic.
  //Move this to factory and connect with thisUser instead of employeeId.
  //Happens on home page load.
  $http.get('token/1').then(function(response){
    console.log(response.data);
    employeeId = {regisId: response.data.regisId};

    //gives you the clients own review and information
    //Happens on page load after we get the token.
    //Used both to load the home page (myReview) and also as the "currentReview"
    $http.post('/employeeData', employeeId).then(function(response){
      var employeeData = response.data;
      console.log('This Employee Review', response.data);
    });

    //gives you all of the reviews the leader needs to review
    //Currently you will be given wayyyyy too much properties but we haven't removed those properties before sending them up yet, but you will still be able to work with this data the same.
    $http.post('/employeeData/leaderReviews', employeeId).then(function(response){
      //we still need to send up the employees information object, but that isnt an immediate need.  If you're confused about what employee you want to target look in the database and compare the Id column in the employeeData table with the EmployeeId column in the Subsection table.
      console.log('This employee\'s direct report\'s reviews', response.data);

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

app.factory('ReviewService', function() {

  var thisUser = {};
  var myReview = {};
  var teamReviews =[];
  var currentReview = {};
  var mapArray = [];

  //default all these vars to false\\
  var leader = false;
  var emp = false;

  var typeField = true;
  var typeSalon = true;

  var empOneTwo = true;
  var empOneToFive = true;
  var empThreePlus = true;
  var empFivePlus = true;
  var empSix = true;
  var empSixAndNoEmpSignature = true;
  var empSeven = true;
  var leaderThreePlus = true;
  var leaderThreeFour = true;
  var leaderThreeFourFive = true;
  var leaderFive = true;
  var leaderSix = true;
  var leaderSixPlus = true;

  //http calls\\
  // GET Token call;
  // GET entire review;
  // GET leader reviews;
  // GET mapArray;
  // PUT subsection;
  // PUT print;
  // PUT sign;

  var updateViewStatuses = function() {
    if (leader==true) {
      empOneTwo = false;
      empOneToFive = false;
      empThreePlus = false;
      empFivePlus = false;
      empSix = false;
      empSixAndNoEmpSignature = false;
      empSeven = false;
       if (currentReview.ReviewStatus==3 || currentReview.ReviewStatus==4) {
         leaderThreePlus = true;
         leaderThreeFour = true;
         leaderThreeFourFive = true;
       } else if (currentReview.ReviewStatus==5) {
         leaderThreePlus = true;
         leaderThreeFourFive = true;
         leaderFive = true;
       } else if (currentReview.ReviewStatus==6) {
         leaderThreePlus = true;
         leaderSix = true;
         leaderSixPlus = true;
       } else if (currentReview.ReviewStatus==7) {
         leaderThreePlus = true;
         leaderSixPlus = true;
       } else {
         leaderThreePlus = false;
         leaderThreeFour = false;
         leaderThreeFourFive = false;
         leaderFive = false;
         leaderSix = false;
         leaderSixPlus = false;
       }
    } else {
      leaderThreePlus = false;
      leaderThreeFour = false;
      leaderThreeFourFive = false;
      leaderFive = false;
      leaderSix = false;
      leaderSixPlus = false;
      if (currentReview.ReviewStatus==1 || currentReview.ReviewStatus==2) {
        empOneTwo = true;
        empOneToFive = true;
      } else if (currentReview.ReviewStatus==3 || currentReview.ReviewStatus==4) {
        empOneToFive = true;
        empThreePlus = true;
      } else if (currentReview.ReviewStatus==5) {
        empOneToFive = true;
        empThreePlus = true;
        empFivePlus = true;
      } else if (currentReview.ReviewStatus==6) {
        empThreePlus = true;
        empFivePlus = true;
        empSix = true;
        if (currentReview.ReviewStatus==6 && currentReview.EmployeeSignature==null) {
          empSixAndNoEmpSignature = false;
        } else {
          empSixAndNoEmpSignature = true;
        }
      } else if (currentReview.ReviewStatus==7) {
        empThreePlus = true;
        empFivePlus = true;
        empSeven = true;
      } else {
        empOneTwo = true;
        empOneToFive = true;
        empThreePlus = true;
        empFivePlus = true;
        empSix = true;
        empSixAndNoEmpSignature = true;
        empSeven = true;
      }
    }
  };
});
