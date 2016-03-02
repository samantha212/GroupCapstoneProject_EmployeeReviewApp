app.controller('FinalRatingController', ['$scope', '$http', 'ReviewService', function($scope, $http, ReviewService){
    $scope.currentReviewEmpInfo = ReviewService.currentReview.empInfo;
    $scope.finalData = ReviewService.currentReview.subsections;
    $scope.subsections = ReviewService.subsections;

}]);
