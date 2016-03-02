app.controller('StrengthsDevsController', ['$scope', '$http', 'ReviewService', function($scope, $http, ReviewService){
    //$scope.strengthDevData = ReviewService.reviews.currentReview[1][ReviewService.subsections.currentStrengthDev];
    //$scope.currentReviewEmpInfo = ReviewService.reviews.currentReview[0][0];

    $scope.currentReviewEmpInfo = ReviewService.currentReview.empInfo;
    $scope.strengthDevData = ReviewService.currentReview.subsections;

    $scope.subsections = ReviewService.subsections;

}]);
