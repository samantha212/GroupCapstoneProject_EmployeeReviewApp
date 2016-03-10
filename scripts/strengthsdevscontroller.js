app.controller('StrengthsDevsController', ['$scope', '$http', '$location', '$anchorScroll', 'ReviewService', function($scope, $http, $location, $anchorScroll, ReviewService){
    ReviewService.checkIfLoggedIn();
    
    $scope.currentReviewEmpInfo = ReviewService.currentReview.empInfo;
    $scope.strengthDevData = ReviewService.currentReview.subsections;

    var role = ReviewService.role;

    $scope.subsections = ReviewService.subsections;

    $scope.putCompleteAndGoNextStrengthDev = function() {
        var leaderIsComp = false;
        var empIsComp = false;

        if(role.leader == true){
            leaderIsComp = true;
        }else{
            empIsComp = true;
        }

        var contentToSend = {regisId: $scope.currentReviewEmpInfo.RegisId, SectionId: 5, SubsectionId: ReviewService.subsections.currentStrengthDev-10, data: {EmployeeResponse: $scope.strengthDevData[ReviewService.subsections.currentStrengthDev].EmployeeResponse, LeaderResponse: $scope.strengthDevData[ReviewService.subsections.currentStrengthDev].LeaderResponse, isCompleted: empIsComp, isLeaderCompleted: leaderIsComp}};

        $http.post('/updateData', contentToSend).then(function(response){
            if(response.status == 200){
                $scope.goNextStrengthDev();
            }
        });
    };

    $scope.putAndGoMap = function(){
        var contentToSend = {regisId: $scope.currentReviewEmpInfo.RegisId, SectionId: 5, SubsectionId: ReviewService.subsections.currentStrengthDev-10, data: {EmployeeResponse: $scope.strengthDevData[ReviewService.subsections.currentStrengthDev].EmployeeResponse, LeaderResponse: $scope.strengthDevData[ReviewService.subsections.currentStrengthDev].LeaderResponse}};

        $http.post('/updateData', contentToSend).then(function(response){
            if(response.status == 200){
                ReviewService.getReview($scope.currentReviewEmpInfo.RegisId);
                $location.path('/map');
            }
        });
    };

    $scope.goNextStrengthDev = function() {
        console.log('goNextStrengthDev function hit');

        if (ReviewService.subsections.currentStrengthDev < 12) {
            $scope.setCurrentStrengthDev(2);
            console.log('current strength/dev:', ReviewService.subsections.currentStrengthDev);
            $anchorScroll('top');
        } else {
            $location.path('/final-rating');
        }

    };


}]);
