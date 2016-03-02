app.controller('HairRatingController', ['$scope', '$http', 'ReviewService', function($scope, $http, ReviewService){
  $scope.currentReviewEmpInfo = ReviewService.currentReview.empInfo;
  $scope.hairRatingData = ReviewService.currentReview.subsections;
  $scope.subsections = ReviewService.subsections;

  //$scope.hairRatingData = ReviewService.reviews.currentReview[1][10];
  //$scope.currentReviewEmpInfo = ReviewService.reviews.currentReview[0][0];
}]);
