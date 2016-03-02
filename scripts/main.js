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

app.controller('MainController', ['$scope', '$http', '$location', 'ReviewService', function($scope, $http, $location, ReviewService){
  $scope.statuses = ReviewService.statuses;
  $scope.ReviewService = ReviewService;
  $scope.putAndGoMap = ReviewService.putAndGoMap;

  //$scope.typeField = ReviewService.type.typeField;
  //$scope.typeSalon = ReviewService.type.typeSalon;

  $scope.leader = true;
  $scope.emp = false;

  //$scope.currentGoal = 1;
  $scope.setCurrentGoal = function(number) {
    ReviewService.subsections.currentGoal = number;
    console.log('Current goal is', ReviewService.subsections.currentGoal);
  };

  //$scope.currentHAIR = 5;
  $scope.setCurrentHAIR = function(number) {
    ReviewService.subsections.currentHAIR = number + 5;
    console.log('Current HAIR is', ReviewService.subsections.currentHAIR);
  };

  //$scope.currentStrengthDev = 10;
  $scope.strengths = false;
  $scope.development = false;
  $scope.setCurrentStrengthDev = function(number) {
    //This sets the currentStrengthDev number to the correct index in the subsections array.
      ReviewService.subsections.currentStrengthDev = number + 10;
      console.log('Current strength/dev is', ReviewService.subsections.currentStrengthDev);
      if(number == 1) {
          $scope.strengths = true;
          $scope.development = false;
      } else {
          $scope.strengths = false;
          $scope.development = true;
      }
  };

    $scope.putCompleteAndGoNextGoal = function() {
        console.log('putCompleteAndGoNextGoal function hit');
        //put that subsection to the DB;
        //Mark subsection as complete.
        $scope.GoNextGoal();
    };

    $scope.GoNextGoal = function() {
        if (ReviewService.subsections.currentGoal < 5) {
            var newGoal = ReviewService.subsections.currentGoal + 1;
            $scope.setCurrentGoal(newGoal);
        } else {
            console.log('current goal', ReviewService.subsectinpmons.currentGoal);
            $scope.setCurrentHAIR(1);
            $location.path('/hair');
        }
    };

    $scope.putCompleteAndGoNextHAIR = function() {
        console.log('putAndGoNextHAIR function hit');
        //put that subsection to the DB;
        if (ReviewService.subsections.currentHAIR < 9) {
            ReviewService.subsections.currentHAIR += 1;
        } else {
            $location.path('/hair-rating');
        }
    };

}]);


app.controller('HomeController', ['$scope', '$http', 'ReviewService', function($scope, $http, ReviewService){
    $scope.myReview = ReviewService.myReview;
    $scope.teamReviews = ReviewService.teamReviews;
    $scope.loadHomePageInfo = ReviewService.loadHomePageInfo;
    $scope.type = ReviewService.type;
    $scope.getReview = ReviewService.getReview;
    $scope.thisUser = ReviewService.thisUser;
}]);



app.factory('ReviewService', ['$http', '$location', function($http, $location) {

  //var reviews = {
  //  thisUser: {},
  //  myReview: {},
  //  teamReviews: {},
  //  currentReview: {}
  //};

    var thisUser = {};
    var myReview = {};
    var teamReviews = {};
    var currentReview = {};

    var subsections = {
        currentGoal: 1,
        currentHAIR: 5,
        currentStrengthDev: 10
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

    var checkStatus = {
        empChecked: false,
        leaderChecked: true
    };

    var submitStatus = {
        empCannotSubmit: (checkStatus.empChecked == false),
        leaderCannotSubmit: (checkStatus.leaderChecked == false)
    };

  //Happens on home page load.
  var loadHomePageInfo = function(){
    //gets the users token, change the number from 1-5 to get different users
    //TO DO *** Revisit this to make it dynamic.
    $http.get('token/1').then(function(response) {
      console.log(response.data);
      //reviews.thisUser = {regisId: response.data.regisId};
      thisUser = {regisId: response.data.regisId};
        console.log('thisUser', thisUser);
      getMyReview({regisId: response.data.regisId});
      getTeamReviews({regisId: response.data.regisId});
    });
  };

    //gives you the user's own review and information
    //Used both to load the home page
  var getMyReview = function(user) {
    $http.post('/employeeData', user).then(function (response) {
        console.log(response.data);
      //reviews.myReview = response.data;
        myReview.empInfo = response.data[0][0];
        myReview.subsections = response.data[1];
      console.log('My Review', myReview);
    });
  };

  var getReview = function(employee){
      console.log("employee being passed in", employee);
    var thisEmployee = {regisId: employee};
    console.log("getReview hit, using thisEmployee:", thisEmployee);
    $http.post('/employeeData', thisEmployee).then(function (response) {
      //console.log("response", response);
      //reviews.currentReview = response.data;
      currentReview.empInfo = response.data[0][0];
      currentReview.subsections = response.data[1];
      console.log('Current Review', currentReview);
    });
  };

  var getTeamReviews = function(user){
    $http.post('/employeeData/leaderReviews', user).then(function(response) {
      console.log('My team\'s reviews:', response);
      //teamReviews.data = response.data;
      //reviews.teamReviews.data = response.data;
      teamReviews.data = response.data;
    });
  };

  //var goToMySignaturePage = function(){
    //Will need to getReview;
    //Then re-route to signature page.
  //};

    //var emailPDF = function() {
    //    PUT call to API;
    //};

    var putAndGoMap = function(){
        console.log('putAndGoMap function hit');
        //put that subsection to the DB;
        $location.path('/map');
    };


  return {
      loadHomePageInfo: loadHomePageInfo,
      getReview: getReview,
      //reviews: reviews,
      myReview: myReview,
      currentReview: currentReview,
      teamReviews: teamReviews,
      thisUser: thisUser,
      subsections: subsections,
      statuses: statuses,
      role: role,
      type: type,
      checkStatus: checkStatus,
      submitStatus: submitStatus,
      putAndGoMap: putAndGoMap
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
