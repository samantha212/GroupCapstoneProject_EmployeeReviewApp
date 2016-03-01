var app = angular.module('regisreview', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    })
    .when('/map', {
      templateUrl: 'views/map.html',
      controller: 'MapController',
      //resolve: {
      //  currentReview: ReviewService.reviews.currentReview
      //}
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
  //$scope.statuses = ReviewService.statuses;
  //$scope.statuses = "This is the scope.statuses";
  //console.log("Statuses", statuses);
  $scope.ReviewService = ReviewService;

  //$scope.typeField = ReviewService.type.typeField;
  //$scope.typeSalon = ReviewService.type.typeSalon;

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

  $scope.currentStrengthDev = 10;
  $scope.strengths = false;
  $scope.development = false;
  $scope.setCurrentStrengthDev = function(number) {
    //This sets the currentStrengthDev number to the correct index in the subsections array.
    $scope.currentStrengthDev = number + 10;
    console.log('Current strength/dev is', $scope.currentStrengthDev);
    if(number == 1) {
      $scope.strengths = true;
      $scope.development = false;
    } else {
      $scope.strengths = false;
      $scope.development = true;
    }
  }

}]);


app.controller('HomeController', ['$scope', '$http', 'ReviewService', function($scope, $http, ReviewService){
  $scope.ReviewService = ReviewService;
  $scope.loadHomePageInfo = ReviewService.loadHomePageInfo;

}]);



app.factory('ReviewService', ['$http', function($http) {

  var reviews = {
    thisUser: {},
    myReview: {},
    teamReviews: {},
    currentReview: {}
  };

  //These are currently set all to true for view/stying purposes.
  //default all these vars to false before deploying\\
  var role = {
    leader: true,
    emp: true
  };

  var type = {
    typeField: true,
    typeSalon: true
  };

  var statuses = {
    empOneTwo: true,
    empOneToFive: true,
    empThreePlus: true,
    empFivePlus: true,
    empSix: true,
    empSixAndNoEmpSignature: true,
    empSeven: true,
    leaderThreePlus: true,
    leaderThreeFour: true,
    leaderThreeFourFive: true,
    leaderFive: true,
    leaderSix: true,
    leaderSixPlus: true
  };

  //Happens on home page load.
  var loadHomePageInfo = function(){
    //gets the users token, change the number from 1-5 to get different users
    //TO DO *** Revisit this to make it dynamic.
    $http.get('token/1').then(function(response) {
      console.log(response.data);
      reviews.thisUser = {regisId: response.data.regisId};
      getMyReview({regisId: response.data.regisId});
      getTeamReviews({regisId: response.data.regisId});
    });
  };

    //gives you the user's own review and information
    //Used both to load the home page
  var getMyReview = function(user) {
    $http.post('/employeeData', user).then(function (response) {
      reviews.myReview = response.data;
      console.log('My Review', reviews.myReview);//[0][0].EmployeeName - I was using this for testing.
    });
  };

  var getReview = function(employee){
    var thisEmployee = {regisId: employee};
    //console.log("getReview hit");
    $http.post('/employeeData', thisEmployee).then(function (response) {
      //console.log("response", response);
      reviews.currentReview = response.data;
      console.log('Current Review', reviews.currentReview);
    });
  };

  var getTeamReviews = function(user){
    $http.post('/employeeData/leaderReviews', user).then(function(response) {
      console.log('My team\'s reviews:', response);
      //teamReviews.data = response.data;
      reviews.teamReviews.data = response.data;
    });
  };

  return {
    loadHomePageInfo: loadHomePageInfo,
    getReview: getReview,
    reviews: reviews,
    statuses: statuses,
    role: role,
    type: type
  };


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
