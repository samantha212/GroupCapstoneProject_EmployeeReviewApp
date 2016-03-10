app.controller('HairController', ['$scope', '$http', '$location', '$anchorScroll', 'ReviewService',function($scope, $http, $location, $anchorScroll, ReviewService){
    ReviewService.checkIfLoggedIn();

    $scope.currentReviewEmpInfo = ReviewService.currentReview.empInfo;
    $scope.hairData = ReviewService.currentReview;
    $scope.subsections = ReviewService.subsections;
    var role = ReviewService.role;

    $scope.putCompleteAndGoNextHAIR = function() {
        var leaderIsComp = false;
        var empIsComp = false;

        if(role.leader == true){
            leaderIsComp = true;
        }else{
            empIsComp = true;
        }

        var contentToSend = {
            regisId: $scope.currentReviewEmpInfo.RegisId,
            SectionId: 3,
            SubsectionId: ReviewService.subsections.currentHAIR-5,
            data: {
                EmployeeResponse: $scope.hairData.subsections[$scope.subsections.currentHAIR].EmployeeResponse,
                LeaderResponse: $scope.hairData.subsections[$scope.subsections.currentHAIR].LeaderResponse,
                isCompleted: empIsComp,
                isLeaderCompleted: leaderIsComp
            }
        };

        $http.post('/updateData', contentToSend).then(function(response){
            if(response.status == 200){
            $scope.goNextHAIR();
            }
        });
    };

    $scope.putAndGoMap = function() {
        var contentToSend = {
            regisId: $scope.currentReviewEmpInfo.RegisId,
            SectionId: 3,
            SubsectionId: ReviewService.subsections.currentHAIR-5,
            data: {
                EmployeeResponse: $scope.hairData.subsections[$scope.subsections.currentHAIR].EmployeeResponse,
                LeaderResponse: $scope.hairData.subsections[$scope.subsections.currentHAIR].LeaderResponse
            }
        };

        $http.post('/updateData', contentToSend).then(function(response){
            if(response.status == 200){
                ReviewService.getReview($scope.currentReviewEmpInfo.RegisId);
                $location.path('/map');
            }
        });
    };

    $scope.goNextHAIR = function() {
        if (ReviewService.subsections.currentHAIR < 9) {
            if (ReviewService.subsections.currentHAIR == 6) {
                $scope.setCurrentHAIR(2);

            } else if (ReviewService.subsections.currentHAIR == 7) {
                $scope.setCurrentHAIR(3);

            } else {
                $scope.setCurrentHAIR(4);
            }

            $anchorScroll('top');

        } else {
            $location.path('/hair-rating');
        }
    };

}]);
