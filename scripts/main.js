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

  //$scope.leader = true;
  $scope.leader = false;
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

    //$scope.putAndGoMap = function() {
    //    console.log('putAndGoMap function hit');
    //    //put that subsection to the DB;
    //    $scope.goMap();
    //};

    $scope.goMap = function() {
        console.log('goMap function hit');
        ReviewService.getReview($scope.currentReviewEmpInfo.RegisId);
        $location.path('/map');
    };

}]);


app.controller('HomeController', ['$scope', '$http', '$location', 'ReviewService', function($scope, $http, $location, ReviewService){
    $scope.myReview = ReviewService.myReview;
    $scope.teamReviews = ReviewService.teamReviews;
    $scope.loadHomePageInfo = ReviewService.loadHomePageInfo;
    $scope.type = ReviewService.type;
    $scope.getReview = ReviewService.getReview;
    $scope.thisUser = ReviewService.thisUser;
    $scope.myReviewStatuses = ReviewService.myReviewStatuses;
    $scope.signOwnReview = ReviewService.signOwnReview;

    $scope.reviewUpdate = function(person) {
        $scope.getReview(person);
    };

    $scope.emailMyPDF = function() {
    //    Regis Corp to use this function to link to their system for emailing PDFs.
    //    This function will email employee's personal PDF to the employee.
        console.log("This will email me my own review as a PDF.");
    };

    $scope.emailEmpPDF = function(person) {
        //    Regis Corp to use this function to link to their system for emailing PDFs.
        //    This function will email the particular team member's PDF to the leader.
        console.log("This will email me ", person, "'s review as a PDF.");
    };
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
  //fix this
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
      leaderSixAndNoLeaderSignature: false,
    leaderSixPlus: false
  };

    var submitStatus = {
        empReadyToSubmit: false,
        leaderReadyToSubmit: false
    };

    var updateSubmitStatus = function() {
        if (role.emp == true) {
            if (type.typeField == true) {
                if (currentReview.subsections[0].isCompleted == false) {
                    submitStatus.empReadyToSubmit = false;
                } else {
                    var status = true;
                    for (var i = 6; i < 14; i++){
                        if (currentReview.subsections[i].isCompleted == false) {
                            status = false;
                        }
                    }
                    submitStatus.empReadyToSubmit = status;
                }
            } else {
                var status = true;
                for (var i = 1; i < 14; i++){
                    if (currentReview.subsections[i].isCompleted == false) {
                        status = false;
                    }
                }
                submitStatus.empReadyToSubmit = status;
                }
        } else {
            if (type.typeField == true) {
                if (currentReview.subsections[0].isLeaderCompleted == false) {
                    submitStatus.leaderReadyToSubmit = false;
                } else {
                    var status = true;
                    for (var i = 6; i < 14; i++){
                        if (currentReview.subsections[i].isLeaderCompleted == false) {
                            status = false;
                        }
                    }
                    submitStatus.leaderReadyToSubmit = status;
                }
            } else {
                var status = true;
                for (var i = 1; i < 14; i++){
                    if (currentReview.subsections[i].isLeaderCompleted == false) {
                        status = false;
                    }
                }
                submitStatus.leaderReadyToSubmit = status;
            }
        }
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
        myReview.empInfo = response.data[0][0];
        myReview.subsections = response.data[1];
        console.log('My Review', myReview);
        updateMyReviewStatuses();
        updateCurrentReviewType(myReview.empInfo.ReviewType);
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
          updateCurrentReviewType(currentReview.empInfo.ReviewType);
          updateRoleAndViewStatuses();
          updateSubmitStatus();
          console.log('Role object:', role);
          console.log('Statuses object:', statuses);
          //console.log('Type object:', type);
          $location.path('/map');
      });
  };

  var getTeamReviews = function(user){
    $http.post('/employeeData/leaderReviews', user).then(function(response) {
      teamReviews.data = response.data;
        console.log('My team\'s reviews:', teamReviews);

    });
  };

    var signOwnReview = function() {
        console.log("signOwnReview hit");
        getReview(myReview.empInfo.RegisId);
        $location.path('/signature');
    };

    var updateCurrentReviewType = function(data) {
        //if (currentReview.empInfo.ReviewType == "FS"){
        if (data == "FS"){
            type.typeField = true;
            type.typeSalon = false;
        } else {
            type.typeField = false;
            type.typeSalon = true;
        }
        console.log("type object", data);
    };

    var updateMyReviewStatuses = function() {
        if (myReview.empInfo.ReviewStatus==1 || myReview.empInfo.ReviewStatus==2) {
            myReviewStatuses.empOneTwo = true;
            myReviewStatuses.empOneToFive = true;
        } else if (myReview.empInfo.ReviewStatus==3 || myReview.empInfo.ReviewStatus==4) {
            myReviewStatuses.empOneTwo = false;
            myReviewStatuses.empOneToFive = true;
            myReviewStatuses.empThreePlus = true;
        } else if (myReview.empInfo.ReviewStatus==5) {
            myReviewStatuses.empOneToFive = true;
            myReviewStatuses.empThreePlus = true;
            myReviewStatuses.empFivePlus = true;
        } else if (myReview.empInfo.ReviewStatus==6) {
            myReviewStatuses.empOneToFive = false;
            myReviewStatuses.empThreePlus = true;
            myReviewStatuses.empFivePlus = true;
            myReviewStatuses.empSix = true;
            if (myReview.empInfo.EmployeeSignature != null) {
                myReviewStatuses.empSixAndNoEmpSignature = false;
            } else {
                myReviewStatuses.empSixAndNoEmpSignature = true;
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
            role.leader = false;
        } else if (thisUser.regisId == currentReview.empInfo.LeaderRegisId) {
            role.emp = false;
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
              statuses.leaderFive = false;
              statuses.leaderSix = false;
              statuses.leaderSixPlus = false;
              statuses.leaderSixAndNoLeaderSignature = false;
          } else if (currentReview.empInfo.ReviewStatus==5) {
              statuses.leaderThreePlus = true;
              statuses.leaderThreeFour = false;
              statuses.leaderThreeFourFive = true;
              statuses.leaderFive = true;
              statuses.leaderSix = false;
              statuses.leaderSixPlus = false;
              statuses.leaderSixAndNoLeaderSignature = false;
          } else if (currentReview.empInfo.ReviewStatus==6) {
              statuses.leaderThreePlus = true;
              statuses.leaderThreeFour = false;
              statuses.leaderThreeFourFive = false;
              statuses.leaderFive = false;
              statuses.leaderThreePlus = true;
              statuses.leaderSix = true;
              statuses.leaderSixPlus = true;
              if (currentReview.empInfo.ReviewStatus==6 && currentReview.empInfo.LeaderSignature != null) {
                  statuses.leaderSixAndNoLeaderSignature = false;
              } else {
                  statuses.leaderSixAndNoLeaderSignature = true;
              }
          } else if (currentReview.empInfo.ReviewStatus==7) {
              statuses.leaderThreePlus = true;
              statuses.leaderThreeFour = false;
              statuses.leaderThreeFourFive = false;
              statuses.leaderFive = false;
              statuses.leaderSix = false;
              statuses.leaderSixPlus = true;
              statuses.leaderSixAndNoLeaderSignature = false;
          } else {
              statuses.leaderThreePlus = false;
              statuses.leaderThreeFour = false;
              statuses.leaderThreeFourFive = false;
              statuses.leaderFive = false;
              statuses.leaderSix = false;
              statuses.leaderSixPlus = false;
              statuses.leaderSixAndNoLeaderSignature = false;

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
                statuses.empOneTwo = false;
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
                if (currentReview.empInfo.ReviewStatus==6 && currentReview.empInfo.EmployeeSignature != null) {
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

      function checkIfLoggedIn(){
        try{if(currentReview.empInfo.RegisId == undefined){console.log('send err')}}
        catch(err){$location.path('/')};
      }

    return {
        loadHomePageInfo: loadHomePageInfo,
        getReview: getReview,
        updateMyReviewStatuses: updateMyReviewStatuses,
        signOwnReview: signOwnReview,
        myReview: myReview,
        currentReview: currentReview,
        teamReviews: teamReviews,
        thisUser: thisUser,
        subsections: subsections,
        imgHAIR: imgHAIR,
        statuses: statuses,
        submitStatus: submitStatus,
        myReviewStatuses: myReviewStatuses,
        role: role,
        type: type,
        checkIfLoggedIn: checkIfLoggedIn
    };

}]);
