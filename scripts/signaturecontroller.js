app.controller('SignatureController', ['$scope', '$http', '$location', 'ReviewService', function($scope, $http, $location, ReviewService){
    ReviewService.checkIfLoggedIn();
    
    $scope.currentReview = ReviewService.currentReview;
    $scope.subsections = ReviewService.subsections;

    var role = ReviewService.role;

    $scope.putAndGoHome = function(){
        var contentToSend = {
            isLeader: role.leader,
            regisId: $scope.currentReview.empInfo.RegisId,
            EmployeeSignature: $scope.currentReview.empInfo.EmployeeSignature,
            LeaderSignature: $scope.currentReview.empInfo.LeaderSignature
        };

        console.log(contentToSend);
        $http.post('/sign', contentToSend).then(function(response) {
            if(response.status == 200){
                ReviewService.getReview($scope.currentReview.empInfo.RegisId);
                $location.path('/map');
            }
        });
    };


}]);
