app.controller('MapController', ['$scope', '$http', '$location', 'ReviewService', function($scope, $http, $location, ReviewService){
    ReviewService.checkIfLoggedIn();

    $scope.currentReview = ReviewService.currentReview;
    $scope.type = ReviewService.type;
    $scope.submitStatus = ReviewService.submitStatus;

    $scope.empSubmit = function() {
        var stateToSend = {
            regisId: $scope.currentReview.empInfo.RegisId,
            ReviewStatus: 3
        };

        $http.post('/updateData/changeState', stateToSend).then(function(response){
            if(response.status == 200){
                ReviewService.updateMyReviewStatuses();
                $location.path('/');
            }
        });
    };

    $scope.leaderSubmitSendToEmp = function() {
        var stateToSend = {
            regisId: $scope.currentReview.empInfo.RegisId,
            ReviewStatus: 5
        };

        $http.post('/updateData/changeState', stateToSend).then(function(response){
            if(response.status == 200){
                $location.path('/');
            }
        });
    };

    $scope.leaderSubmitForSignatures = function() {
        var stateToSend = {
            regisId: $scope.currentReview.empInfo.RegisId,
            ReviewStatus: 6
        };

        $http.post('/updateData/changeState', stateToSend).then(function(response){
            if(response.status == 200){
                $location.path('/');
            }
        });
    };

}]);
