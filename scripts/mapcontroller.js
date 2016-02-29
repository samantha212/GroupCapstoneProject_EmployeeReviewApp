app.controller('MapController', ['$scope', '$http', 'ReviewService', function($scope, $http, ReviewService){
    var thisUser = ReviewService.reviews.thisUser;
    //var thisUser = {regisId: "MIMIL1"};
    var myReview = ReviewService.reviews.myReview;
    //*** Need to come back and update currentReview based on which button is clicked.
    //var currentReview = ReviewService.reviews.myReview;
    var mapArray = [];
    $scope.getMapArray = getMapView;
    console.log("team reviews", ReviewService.reviews.teamReviews);

    $scope.dataTest = ReviewService;

    $scope.typeField = true;
    $scope.typeSalon = true;

    $scope.financesComplete = true;
    $scope.goalOneComplete = true;
    $scope.goalTwoComplete = true;
    $scope.goalThreeComplete = true;
    $scope.goalFourComplete = true;
    $scope.goalFiveComplete = true;

    $scope.hComplete = true;
    $scope.aComplete = true;
    $scope.iComplete = false;
    $scope.rComplete = false;
    $scope.hairRatingComplete = false;

    $scope.strengthsComplete = true;
    $scope.developmentComplete = false;
    $scope.finalRatingComplete = false;

    //***** We need the back end team to update this query to take in the employee's RegisId instead of the plain id. *****
    //We are going to leave this for now, but will need to come back and update the data sent in the POST call.
    //In an object send down the employeeId of the employee you would like to get the current map view information of.
    //Id in the employee information object is the same Id as EmployeeId in the other objects, match the two to know who you are dealing with
    //The 2 in this object is the employee review with the id of 2, once you start getting the client logic running you will want this objects id value to be dynamic to which review you click on, but for now we decided to hard code the employee with the id of 2
    //var getThisEmployeesMap = {Id: 2};
    //var user = ReviewService.reviews.thisUser;
    function getMapView() {
        console.log("user", ReviewService.reviews.thisUser);
        $http.post('/getmapview', ReviewService.reviews.thisUser).then(function(response){
            console.log('Map view info', response);
            mapArray = response.data;
            console.log('mapArray', mapArray);
            console.log('This user', thisUser);
            console.log('myReview', myReview);
            console.log('currentReview', ReviewService.reviews.currentReview);
            updateCheckboxes();
        });
    };

    var updateCheckboxes = function(){
        var reviewInfo = ReviewService.reviews.currentReview[0];
        var subsectionInfo = ReviewService.reviews.currentReview[1];
        var userView;

        if (reviewInfo[0].reviewType == "SS") {
            $scope.typeSalon = true;
        } else {
            $scope.typeField = true;
        }

        if (thisUser.regisId == reviewInfo[0].RegisId) {
            console.log("employee");
            userView = "employee";
        } else if (thisUser.regisId == reviewInfo[0].LeaderRegisId){
            console.log("leader");
            userView = "leader";
        } else {
            console.log("neither employee nor leader")
        }

        if (userView == "employee") {
            $scope.financesComplete = subsectionInfo[0].isCompleted;
            $scope.goalOneComplete = subsectionInfo[1].isCompleted;
            $scope.goalTwoComplete = subsectionInfo[2].isCompleted;
            $scope.goalThreeComplete = subsectionInfo[3].isCompleted;
            $scope.goalFourComplete = subsectionInfo[4].isCompleted;
            $scope.goalFiveComplete = subsectionInfo[5].isCompleted;

            $scope.hComplete = subsectionInfo[6].isCompleted;
            $scope.aComplete = subsectionInfo[7].isCompleted;
            $scope.iComplete = subsectionInfo[8].isCompleted;
            $scope.rComplete = subsectionInfo[9].isCompleted;
            $scope.hairRatingComplete = subsectionInfo[10].isCompleted;

            $scope.strengthsComplete = subsectionInfo[11].isCompleted;
            $scope.developmentComplete = subsectionInfo[12].isCompleted;
            $scope.finalRatingComplete = subsectionInfo[13].isCompleted;
        } else if (userView == "leader") {
            $scope.financesComplete = subsectionInfo[0].isLeaderCompleted;
            $scope.goalOneComplete = subsectionInfo[1].isLeaderCompleted;
            $scope.goalTwoComplete = subsectionInfo[2].isLeaderCompleted;
            $scope.goalThreeComplete = subsectionInfo[3].isLeaderCompleted;
            $scope.goalFourComplete = subsectionInfo[4].isLeaderCompleted;
            $scope.goalFiveComplete = subsectionInfo[5].isLeaderCompleted;

            $scope.hComplete = subsectionInfo[6].isLeaderCompleted;
            $scope.aComplete = subsectionInfo[7].isLeaderCompleted;
            $scope.iComplete = subsectionInfo[8].isLeaderCompleted;
            $scope.rComplete = subsectionInfo[9].isLeaderCompleted;
            $scope.hairRatingComplete = subsectionInfo[10].isLeaderCompleted;

            $scope.strengthsComplete = subsectionInfo[11].isLeaderCompleted;
            $scope.developmentComplete = subsectionInfo[12].isLeaderCompleted;
            $scope.finalRatingComplete = subsectionInfo[13].isLeaderCompleted;

        }

    };
// ***** We need to come back and connect each of the true/false values above to the response object.
}]);
