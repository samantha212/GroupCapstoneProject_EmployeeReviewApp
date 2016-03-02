app.controller('HairController', ['$scope', '$http', 'ReviewService',function($scope, $http, ReviewService){
  $scope.currentReviewEmpInfo = ReviewService.currentReview.empInfo;
  $scope.hairData = ReviewService.currentReview.subsections;
  $scope.subsections = ReviewService.subsections;

  $scope.hairSubsectionH = ReviewService.subsections.currentHAIR == 6;
  $scope.hairSubsectionA = ReviewService.subsections.currentHAIR == 7;
  $scope.hairSubsectionI = ReviewService.subsections.currentHAIR == 8;
  $scope.hairSubsectionR = ReviewService.subsections.currentHAIR == 9;

}]);
