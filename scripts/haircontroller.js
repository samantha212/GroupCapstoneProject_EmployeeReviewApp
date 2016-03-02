app.controller('HairController', ['$scope', '$http', 'ReviewService',function($scope, $http, ReviewService){
  //$scope.hairData = ReviewService.reviews.currentReview[1][$scope.currentHAIR];
  $scope.currentReviewEmpInfo = ReviewService.reviews.currentReview[0][0];

  $scope.hairSubsectionH = ReviewService.subsections.currentHAIR == 6;
  $scope.hairSubsectionA = ReviewService.subsections.currentHAIR == 7;
  $scope.hairSubsectionI = ReviewService.subsections.currentHAIR == 8;
  $scope.hairSubsectionR = ReviewService.subsections.currentHAIR == 9;

}]);
