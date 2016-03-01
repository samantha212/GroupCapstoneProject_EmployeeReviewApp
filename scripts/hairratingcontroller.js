app.controller('HairRatingController', ['$scope', '$http', 'ReviewService', function($scope, $http, ReviewService){
  $scope.hairRatingData = ReviewService.reviews.currentReview[1][10];
  $scope.currentReviewEmpInfo = ReviewService.reviews.currentReview[0][0];
}]);
