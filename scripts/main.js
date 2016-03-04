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

app.controller('MainController', ['$scope', '$http', '$location', 'ReviewService', function($scope, $http, $location, ReviewService){
  $scope.statuses = ReviewService.statuses;
  $scope.ReviewService = ReviewService;

  //$scope.typeField = ReviewService.type.typeField;
  //$scope.typeSalon = ReviewService.type.typeSalon;

  $scope.leader = true;
  $scope.emp = false;

    $scope.hairSubsectionH = true;
    $scope.hairSubsectionA = false;
    $scope.hairSubsectionI = false;
    $scope.hairSubsectionR = false;


  $scope.setCurrentGoal = function(number) {
    ReviewService.subsections.currentGoal = number;
    console.log('Current goal is', ReviewService.subsections.currentGoal);
  };

  $scope.setCurrentHAIR = function(number) {
      ReviewService.subsections.currentHAIR = number + 5;
      console.log('Current HAIR is', ReviewService.subsections.currentHAIR);
      $scope.setImgHAIR();
  };

    $scope.setImgHAIR = function() {
        if (ReviewService.subsections.currentHAIR == 6) {
            $scope.hairSubsectionH = true;
            $scope.hairSubsectionA  = false;
            $scope.hairSubsectionI  = false;
            $scope.hairSubsectionR  = false;
        } else if (ReviewService.subsections.currentHAIR == 7) {
            $scope.hairSubsectionH = false;
            $scope.hairSubsectionA  = true;
            $scope.hairSubsectionI  = false;
            $scope.hairSubsectionR  = false;
        } else if (ReviewService.subsections.currentHAIR == 8) {
            $scope.hairSubsectionH = false;
            $scope.hairSubsectionA = false;
            $scope.hairSubsectionI = true;
            $scope.hairSubsectionR = false;
        } else {
            $scope.hairSubsectionH  = false;
            $scope.hairSubsectionA  = false;
            $scope.hairSubsectionI  = false;
            $scope.hairSubsectionR  = true;
        }
    }

  $scope.strengths = false;
  $scope.development = false;

  $scope.setCurrentStrengthDev = function(number) {
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

    $scope.putAndGoMap = function() {
        console.log('putAndGoMap function hit');
        //put that subsection to the DB;
        $scope.goMap();
    };

    $scope.goMap = function() {
        console.log('goMap function hit');
        $location.path('/map');
    };

}]);


app.controller('HomeController', ['$scope', '$http', 'ReviewService', function($scope, $http, ReviewService){
    $scope.myReview = ReviewService.myReview;
    $scope.teamReviews = ReviewService.teamReviews;
    $scope.loadHomePageInfo = ReviewService.loadHomePageInfo;
    $scope.type = ReviewService.type;
    $scope.getReview = ReviewService.getReview;
    $scope.thisUser = ReviewService.thisUser;
    $scope.myReviewStatuses = ReviewService.myReviewStatuses;
    $scope.signOwnReview = ReviewService.signOwnReview;
}]);



app.factory('ReviewService', ['$http', '$location', function($http, $location) {

    var thisUser = {};
    var myReview = {};
    var teamReviews = {};
    var currentReview = {};

    var subsections = {
        currentGoal: 1,
        currentHAIR: 5,
        currentStrengthDev: 10
    };

    var imgHAIR = {
        hairSubsectionH: false,
        hairSubsectionA: false,
        hairSubsectionI: false,
        hairSubsectionR: false
    }

  //These are currently set all to true for view/stying purposes.
  //default all these vars to false before deploying\\
  var role = {
    leader: false,
    emp: false
  };

  var type = {
    typeField: true,
    typeSalon: true
  };

    var myReviewStatuses = {
        empOneTwo: false,
        empOneToFive: false,
        empThreePlus: false,
        empFivePlus: false,
        empSix: false,
        empSixAndNoEmpSignature: false,
        empSeven: false,
    }
  var statuses = {
    empOneTwo: false,
    empOneToFive: false,
    empThreePlus: false,
    empFivePlus: false,
    empSix: false,
    empSixAndNoEmpSignature: false,
    empSeven: false,
    leaderThreePlus: false,
    leaderThreeFour: false,
    leaderThreeFourFive: false,
    leaderFive: false,
    leaderSix: false,
    leaderSixPlus: false
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
        updateMyReviewStatuses();
        console.log('myReviewStatuses', myReviewStatuses);
    });
  };

  var getReview = function(employee){
      console.log("employee being passed in", employee);
      var thisEmployee = {regisId: employee};
      console.log("getReview hit, using thisEmployee:", thisEmployee);
      $http.post('/employeeData', thisEmployee).then(function (response) {
          currentReview.empInfo = response.data[0][0];
          currentReview.subsections = response.data[1];
          console.log('Current Review', currentReview);
          updateRoleAndViewStatuses();
          console.log('Role object:', role);
          console.log('Statuses object:', statuses);
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

    var signOwnReview = function() {
        console.log("signOwnReview hit");
        getReview(myReview.empInfo.RegisId);
        $location.path('/signature');
    };

    var updateMyReviewStatuses = function() {
        if (myReview.empInfo.ReviewStatus==1 || myReview.empInfo.ReviewStatus==2) {
            myReviewStatuses.empOneTwo = true;
            myReviewStatuses.empOneToFive = true;
        } else if (myReview.empInfo.ReviewStatus==3 || myReview.empInfo.ReviewStatus==4) {
            myReviewStatuses.empOneToFive = true;
            myReviewStatuses.empThreePlus = true;
        } else if (myReview.empInfo.ReviewStatus==5) {
            myReviewStatuses.empOneToFive = true;
            myReviewStatuses.empThreePlus = true;
            myReviewStatuses.empFivePlus = true;
        } else if (myReview.empInfo.ReviewStatus==6) {
            myReviewStatuses.empThreePlus = true;
            myReviewStatuses.empFivePlus = true;
            myReviewStatuses.empSix = true;
            if (myReview.empInfo.EmployeeSignature == null) {
                myReviewStatuses.empSixAndNoEmpSignature = true;
            } else {
                myReviewStatuses.empSixAndNoEmpSignature = false;
            }
        } else if (myReview.empInfo.ReviewStatus==7) {
            myReviewStatuses.empThreePlus = true;
            myReviewStatuses.empFivePlus = true;
            myReviewStatuses.empSeven = true;
        } else {
            myReviewStatuses.empOneTwo = false;
            myReviewStatuses.empOneToFive = false;
            myReviewStatuses.empThreePlus = false;
            myReviewStatuses.empFivePlus = false;
            myReviewStatuses.empSix = false;
            myReviewStatuses.empSixAndNoEmpSignature = false;
            myReviewStatuses.empSeven = false;
        }
    }
      var updateRoleAndViewStatuses = function() {
        if (thisUser.regisId == currentReview.empInfo.RegisId) {
            role.emp = true;
        } else if (thisUser.regisId == currentReview.empInfo.LeaderRegisId) {
            role.leader = true;
        } else {
            console.log("Error.  User is neither employee nor leader for this review.")
        }
        if (role.leader==true) {
            statuses.empOneTwo = false;
            statuses.empOneToFive = false;
            statuses.empThreePlus = false;
            statuses.empFivePlus = false;
            statuses.empSix = false;
            statuses.empSixAndNoEmpSignature = false;
            statuses.empSeven = false;
          if (currentReview.empInfo.ReviewStatus==3 || currentReview.empInfo.ReviewStatus==4) {
              statuses.leaderThreePlus = true;
              statuses.leaderThreeFour = true;
              statuses.leaderThreeFourFive = true;
          } else if (currentReview.empInfo.ReviewStatus==5) {
              statuses.leaderThreePlus = true;
              statuses.leaderThreeFourFive = true;
              statuses.leaderFive = true;
          } else if (currentReview.empInfo.ReviewStatus==6) {
              statuses.leaderThreePlus = true;
              statuses.leaderSix = true;
              statuses.leaderSixPlus = true;
          } else if (currentReview.empInfo.ReviewStatus==7) {
              statuses.leaderThreePlus = true;
              statuses.leaderSixPlus = true;
          } else {
              statuses.leaderThreePlus = false;
              statuses.leaderThreeFour = false;
              statuses.leaderThreeFourFive = false;
              statuses.leaderFive = false;
              statuses.leaderSix = false;
              statuses.leaderSixPlus = false;
          }
        } else {
            statuses.leaderThreePlus = false;
            statuses.leaderThreeFour = false;
            statuses.leaderThreeFourFive = false;
            statuses.leaderFive = false;
            statuses.leaderSix = false;
            statuses.leaderSixPlus = false;
            if (currentReview.empInfo.ReviewStatus==1 || currentReview.empInfo.ReviewStatus==2) {
                statuses.empOneTwo = true;
                statuses.empOneToFive = true;
            } else if (currentReview.empInfo.ReviewStatus==3 || currentReview.empInfo.ReviewStatus==4) {
                statuses.empOneToFive = true;
                statuses.empThreePlus = true;
            } else if (currentReview.empInfo.ReviewStatus==5) {
                statuses.empOneToFive = true;
                statuses.empThreePlus = true;
                statuses.empFivePlus = true;
            } else if (currentReview.empInfo.ReviewStatus==6) {
                statuses.empThreePlus = true;
                statuses.empFivePlus = true;
                statuses.empSix = true;
                if (currentReview.empInfo.ReviewStatus==6 && currentReview.empInfo.EmployeeSignature==null) {
                    statuses.empSixAndNoEmpSignature = false;
                } else {
                    statuses.empSixAndNoEmpSignature = true;
                }
            } else if (currentReview.empInfo.ReviewStatus==7) {
                statuses.empThreePlus = true;
                statuses.empFivePlus = true;
                statuses.empSeven = true;
            } else {
                statuses.empOneTwo = true;
                statuses.empOneToFive = true;
                statuses.empThreePlus = true;
                statuses.empFivePlus = true;
                statuses.empSix = true;
                statuses.empSixAndNoEmpSignature = true;
                statuses.empSeven = true;
            }
        }
      };

    return {
        loadHomePageInfo: loadHomePageInfo,
        getReview: getReview,
        signOwnReview: signOwnReview,
        myReview: myReview,
        currentReview: currentReview,
        teamReviews: teamReviews,
        thisUser: thisUser,
        subsections: subsections,
        imgHAIR: imgHAIR,
        statuses: statuses,
        myReviewStatuses: myReviewStatuses,
        role: role,
        type: type
    };

}]);
