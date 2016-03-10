app.controller('FinalRatingController', ['$scope', '$http', 'ReviewService', '$location', function($scope, $http, ReviewService, $location){
    ReviewService.checkIfLoggedIn();

    $scope.currentReviewEmpInfo = ReviewService.currentReview.empInfo;
    $scope.finalData = ReviewService.currentReview.subsections;
    $scope.subsections = ReviewService.subsections;
    var role = ReviewService.role;

    $scope.putCompleteAndGoMap = function() {
        var leaderIsComp = false;
        var empIsComp = false;

        if(role.leader == true){
        leaderIsComp = true;
        }else{
        empIsComp = true;
        }
        var contentToSend = {regisId: $scope.currentReviewEmpInfo.RegisId, SectionId: 6, SubsectionId: 1, data: {EmployeeResponse: $scope.finalData[13].EmployeeResponse, LeaderResponse: $scope.finalData[13].LeaderResponse, EmployeeFinalRating: $scope.finalData[13].EmployeeFinalRating, LeaderFinalRating: $scope.finalData[13].LeaderFinalRating, isCompleted: empIsComp, isLeaderCompleted: leaderIsComp}};

        $http.post('/updateData', contentToSend).then(function(response){
        if(response.status == 200){
          ReviewService.getReview($scope.currentReviewEmpInfo.RegisId);
          $location.path('/map');
        }
        });
    };

    $scope.putAndGoMap = function(){
        var contentToSend = {regisId: $scope.currentReviewEmpInfo.RegisId, SectionId: 6, SubsectionId: 1, data: { EmployeeResponse: $scope.finalData[13].EmployeeResponse, LeaderResponse: $scope.finalData[13].LeaderResponse, EmployeeFinalRating: $scope.finalData[13].EmployeeFinalRating, LeaderFinalRating: $scope.finalData[13].LeaderFinalRating}};

        $http.post('/updateData', contentToSend).then(function(response){
        if(response.status == 200){
          ReviewService.getReview($scope.currentReviewEmpInfo.RegisId);
          $location.path('/map');
        }
        });
    };


}]);
