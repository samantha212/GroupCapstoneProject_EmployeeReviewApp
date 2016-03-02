app.controller('SignatureController', ['$scope', '$http', 'ReviewService', function($scope, $http, ReviewService){
    $scope.employeeSignature = ReviewService.reviews.currentReview[0][0].EmployeeSignature;
    $scope.leaderSignature = ReviewService.reviews.currentReview[0][0].LeaderSignature;
    $scope.currentReviewEmpInfo = ReviewService.reviews.currentReview[0][0];

    $scope.checkStatus = ReviewService.checkStatus;

    $scope.submitStatus = ReviewService.submitStatus;

    $scope.putAndGoHome = function(){
        console.log("sign Button clicked!")
    };
}]);
