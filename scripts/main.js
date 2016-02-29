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

app.controller('MainController', ['$scope', '$http', 'ReviewService', function($scope, $http, ReviewService){

  $scope.typeField = ReviewService.typeField;
  $scope.typeSalon = ReviewService.typeSalon;

  $scope.empOneTwo = ReviewService.empOneTwo;
  $scope.empOneToFive = ReviewService.empOneToFive;
  $scope.empThreePlus = ReviewService.empThreePlus;
  $scope.empFivePlus = ReviewService.empFivePlus;
  $scope.empSix = ReviewService.empSix;
  $scope.empSixAndNoEmpSignature = ReviewService.empSixAndNoEmpSignature;
  $scope.empSeven = ReviewService.empSeven;
  $scope.leaderThreePlus = ReviewService.leaderThreePlus;
  $scope.leaderThreeFour = ReviewService.leaderThreeFour;
  $scope.leaderThreeFourFive = ReviewService.leaderThreeFourFive;
  $scope.leaderFive = ReviewService.leaderFive;
  $scope.leaderSix = ReviewService.leaderSix;
  $scope.leaderSixPlus = ReviewService.leaderSixPlus;

  $scope.leader = true;
  $scope.emp = false;

  $scope.currentGoal = 1;
  $scope.setCurrentGoal = function(number) {
    $scope.currentGoal = number;
    console.log('Current goal is', $scope.currentGoal);
  };

  $scope.currentHAIR = 1;
  $scope.setCurrentHAIR = function(number) {
    $scope.currentHAIR = number;
    console.log('Current HAIR is', $scope.currentHAIR);
  };

  $scope.currentStrengthDev = 1;
  $scope.setCurrentStrengthDev = function(number) {
    $scope.currentStrengthDev = number;
    console.log('Current strength/dev is', $scope.currentStrengthDev);
  }

}]);


app.controller('HomeController', ['$scope', '$http', 'ReviewService', function($scope, $http, ReviewService){

  $scope.loadHomePageInfo = ReviewService.loadHomePageInfo;

  $scope.directReports = ReviewService.teamReviews.data;

  //$scope.directReports = [
  //  {name: "Joe Black", ReviewStatus: "Emp Submit"},
  //  {name: "Susan Brown", ReviewStatus: "Leader Saved"},
  //  {name: "William Oliver", ReviewStatus: "Leader Submit"},
  //  {name: "Sarah Jones", ReviewStatus: "Ready for Signature"},
  //  {name: "Roy Patiq", ReviewStatus: "Complete"}
  //];

}]);



app.factory('ReviewService', ['$http', function($http) {

  var thisUser = {};
  var myReview = {};
  var teamReviews = {};
  //***** Need to come back and make this dynamic.
  var currentReview = {};

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

  //Happens on home page load.
  var loadHomePageInfo = function(){
    //gets the users token, change the number from 1-5 to get different users
    //TO DO *** Revisit this to make it dynamic.
    $http.get('token/1').then(function(response) {
      console.log(response.data);
      thisUser = {regisId: response.data.regisId};
      getMyReview({regisId: response.data.regisId});
      getTeamReviews({regisId: response.data.regisId});
    });
  };

    //gives you the clients own review and information
    //Used both to load the home page (myReview) and also as the "currentReview"
  var getMyReview = function(user) {
    $http.post('/employeeData', user).then(function (response) {
      myReview = response.data;
      console.log('My Review', myReview);//[0][0].EmployeeName - I was using this for testing.
    });
  };

  var getTeamReviews = function(user){
    $http.post('/employeeData/leaderReviews', user).then(function(response) {
      console.log('My team\'s reviews:', response);
      teamReviews.data = response.data;
    });
  };

  var fetchMyReview = function(){
    return myReview;
  };

  var fetchThisUser = function(){
    return thisUser;
  };

  var fetchCurrentReview = function(){
    return currentReview;
  };

  var fetchMyTeam = function(){
    return teamReviews;
  };

  return {
    loadHomePageInfo: loadHomePageInfo,
    thisUser: fetchThisUser,
    myReview: fetchMyReview,
    currentReview: fetchCurrentReview,
    teamReviews: teamReviews,
    leader: leader,
    emp: emp,
    typeField: typeField,
    typeSalon: typeSalon,
    empOneTwo: empOneTwo,
    empOneToFive: empOneToFive,
    empThreePlus: empThreePlus,
    empFivePlus: empFivePlus,
    empSix: empSix,
    empSixAndNoEmpSignature: empSixAndNoEmpSignature,
    empSeven: empSeven,
    leaderThreePlus: leaderThreePlus,
    leaderThreeFour: leaderThreeFour,
    leaderThreeFourFive: leaderThreeFourFive,
    leaderFive: leaderFive,
    leaderSix: leaderSix,
    leaderSixPlus: leaderSixPlus,
    teamReviews: teamReviews
  };



      // GET entire review;
      // GET leader reviews;
      // GET mapArray;
      // PUT subsection;
      // PUT print;
      // PUT sign;

      //var updateViewStatuses = function() {
      //  if (leader==true) {
      //    empOneTwo = false;
      //    empOneToFive = false;
      //    empThreePlus = false;
      //    empFivePlus = false;
      //    empSix = false;
      //    empSixAndNoEmpSignature = false;
      //    empSeven = false;
      //    if (currentReview.ReviewStatus==3 || currentReview.ReviewStatus==4) {
      //      leaderThreePlus = true;
      //      leaderThreeFour = true;
      //      leaderThreeFourFive = true;
      //    } else if (currentReview.ReviewStatus==5) {
      //      leaderThreePlus = true;
      //      leaderThreeFourFive = true;
      //      leaderFive = true;
      //    } else if (currentReview.ReviewStatus==6) {
      //      leaderThreePlus = true;
      //      leaderSix = true;
      //      leaderSixPlus = true;
      //    } else if (currentReview.ReviewStatus==7) {
      //      leaderThreePlus = true;
      //      leaderSixPlus = true;
      //    } else {
      //      leaderThreePlus = false;
      //      leaderThreeFour = false;
      //      leaderThreeFourFive = false;
      //      leaderFive = false;
      //      leaderSix = false;
      //      leaderSixPlus = false;
      //    }
      //  } else {
      //    leaderThreePlus = false;
      //    leaderThreeFour = false;
      //    leaderThreeFourFive = false;
      //    leaderFive = false;
      //    leaderSix = false;
      //    leaderSixPlus = false;
      //    if (currentReview.ReviewStatus==1 || currentReview.ReviewStatus==2) {
      //      empOneTwo = true;
      //      empOneToFive = true;
      //    } else if (currentReview.ReviewStatus==3 || currentReview.ReviewStatus==4) {
      //      empOneToFive = true;
      //      empThreePlus = true;
      //    } else if (currentReview.ReviewStatus==5) {
      //      empOneToFive = true;
      //      empThreePlus = true;
      //      empFivePlus = true;
      //    } else if (currentReview.ReviewStatus==6) {
      //      empThreePlus = true;
      //      empFivePlus = true;
      //      empSix = true;
      //      if (currentReview.ReviewStatus==6 && currentReview.EmployeeSignature==null) {
      //        empSixAndNoEmpSignature = false;
      //      } else {
      //        empSixAndNoEmpSignature = true;
      //      }
      //    } else if (currentReview.ReviewStatus==7) {
      //      empThreePlus = true;
      //      empFivePlus = true;
      //      empSeven = true;
      //    } else {
      //      empOneTwo = true;
      //      empOneToFive = true;
      //      empThreePlus = true;
      //      empFivePlus = true;
      //      empSix = true;
      //      empSixAndNoEmpSignature = true;
      //      empSeven = true;
      //    }
      //  }
      //};
}]);
