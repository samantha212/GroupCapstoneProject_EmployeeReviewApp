app.controller('SignatureController', ['$scope', '$http', 'ReviewService', function($scope, $http, ReviewService){

    $scope.currentReview = ReviewService.currentReview;
    $scope.currentReviewEmpInfo = ReviewService.currentReview.empInfo;
    $scope.finalData = ReviewService.currentReview.subsections;
    $scope.subsections = ReviewService.subsections;

    //*** Need to revisit to make this dynamic.
    $scope.checkStatus = ReviewService.checkStatus;
    $scope.submitStatus = ReviewService.submitStatus;

    $scope.putAndGoHome = function(){
        console.log("sign Button clicked!")
    };
}]);
