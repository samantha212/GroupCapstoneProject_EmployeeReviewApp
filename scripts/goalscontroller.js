app.controller('GoalsController', ['$scope', '$http', 'ReviewService', function($scope, $http, ReviewService){
    $scope.reviewData = ReviewService.reviews;
    $scope.currentReviewEmpInfo = ReviewService.reviews.currentReview[0][0];

    $scope.subsections = ReviewService.subsections;
}]);
