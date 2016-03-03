app.controller('SignatureController', ['$scope', '$http', 'ReviewService', function($scope, $http, ReviewService){

    $scope.currentReview = ReviewService.currentReview;
    $scope.currentReviewEmpInfo = ReviewService.currentReview.empInfo;
    $scope.finalData = ReviewService.currentReview.subsections;
    $scope.subsections = ReviewService.subsections;

    $scope.putAndGoHome = function(){
        console.log("sign Button clicked!")
    };
}]);
