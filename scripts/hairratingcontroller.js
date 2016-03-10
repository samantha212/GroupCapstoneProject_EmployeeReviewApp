app.controller('HairRatingController', ['$scope', '$http', '$location', 'ReviewService', function($scope, $http, $location, ReviewService){
    ReviewService.checkIfLoggedIn();

    $scope.currentReviewEmpInfo = ReviewService.currentReview.empInfo;
    $scope.hairRatingData = ReviewService.currentReview.subsections;
    $scope.subsections = ReviewService.subsections;

    var role = ReviewService.role;

    $scope.putCompleteAndGoStrengths = function() {
        var leaderIsComp = false;
        var empIsComp = false;

        if(role.leader == true){
            leaderIsComp = true;
        }else{
            empIsComp = true;
        }
        var contentToSend = {regisId: $scope.currentReviewEmpInfo.RegisId, SectionId: 4, SubsectionId: 1, data: {EmployeeHairRating: $scope.hairRatingData[10].EmployeeHairRating, LeaderHairRating: $scope.hairRatingData[10].LeaderHairRating, isCompleted: empIsComp, isLeaderCompleted: leaderIsComp}};

        $http.post('/updateData', contentToSend).then(function(response){
            if(response.status == 200){
                $scope.goStrengths();
            }
        });
    };

    $scope.putAndGoMap = function(){
        var contentToSend = {
            regisId: $scope.currentReviewEmpInfo.RegisId,
            SectionId: 4,
            SubsectionId: 1,
            data: {
                EmployeeHairRating: $scope.hairRatingData[10].EmployeeHairRating,
                LeaderHairRating: $scope.hairRatingData[10].LeaderHairRating
            }
        };

        $http.post('/updateData', contentToSend).then(function(response){
            if(response.status == 200){
                ReviewService.getReview($scope.currentReviewEmpInfo.RegisId);
                $location.path('/map');
            }
        });
    };

    $scope.goStrengths = function() {
        $scope.setCurrentStrengthDev(1);
        $location.path('/strengths-devs');
    }
}]);
