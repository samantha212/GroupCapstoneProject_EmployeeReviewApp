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
    };

    var role = {
        leader: false,
        emp: false
    };

    var type = {
        typeField: false,
        typeSalon: false
    };

    var myReviewStatuses = {
        empOneTwo: false,
        empOneToFive: false,
        empThreePlus: false,
        empFivePlus: false,
        empSix: false,
        empSixAndNoEmpSignature: false,
        empSeven: false,
    };

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

    var loadHomePageInfo = function(){
        $http.get('token/1').then(function(response) {
            thisUser = {regisId: response.data.regisId};
            getMyReview({regisId: response.data.regisId});
            getTeamReviews({regisId: response.data.regisId});
        });
    };

    var getMyReview = function(user) {
        $http.post('/employeeData', user).then(function (response) {
            myReview.empInfo = response.data[0][0];
            myReview.subsections = response.data[1];
            updateMyReviewStatuses();
            updateCurrentReviewType(myReview.empInfo.ReviewType);
        });
    };

    var getReview = function(employee){
        var thisEmployee = {regisId: employee};

        $http.post('/employeeData', thisEmployee).then(function (response) {
            currentReview.empInfo = response.data[0][0];
            currentReview.subsections = response.data[1];

            updateCurrentReviewType(currentReview.empInfo.ReviewType);
            updateRoleAndViewStatuses();
            updateSubmitStatus();

            $location.path('/map');
        });
    };

    var getTeamReviews = function(user){
        $http.post('/employeeData/leaderReviews', user).then(function(response) {
            teamReviews.data = response.data;
        });
    };

    var signOwnReview = function() {
        getReview(myReview.empInfo.RegisId);
        $location.path('/signature');
    };

    var updateCurrentReviewType = function(data) {
        if (data == "FS"){
            type.typeField = true;
            type.typeSalon = false;
        } else {
            type.typeField = false;
            type.typeSalon = true;
        }
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
    };

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
        checkIfLoggedIn: checkIfLoggedIn,
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
        type: type
    };

}]);