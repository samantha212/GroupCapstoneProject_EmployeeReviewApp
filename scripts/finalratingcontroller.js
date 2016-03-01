app.controller('FinalRatingController', ['$scope', '$http', 'ReviewService', function($scope, $http, ReviewService){
    $scope.finalData = ReviewService.reviews.currentReview[1][13];
    $scope.currentReviewEmpInfo = ReviewService.reviews.currentReview[0][0];

}]);
