app.controller('HairController', ['$scope', '$http', '$location', 'ReviewService',function($scope, $http, $location, ReviewService){
  $scope.currentReviewEmpInfo = ReviewService.currentReview.empInfo;
  $scope.hairData = ReviewService.currentReview.subsections;
  $scope.subsections = ReviewService.subsections;

  $scope.hairSubsectionH = ReviewService.subsections.currentHAIR == 6;
  $scope.hairSubsectionA = ReviewService.subsections.currentHAIR == 7;
  $scope.hairSubsectionI = ReviewService.subsections.currentHAIR == 8;
  $scope.hairSubsectionR = ReviewService.subsections.currentHAIR == 9;

  $scope.putCompleteAndGoNextHAIR = function() {
    console.log('putAndGoNextHAIR function hit');
    //put that subsection to the DB;
    $scope.goNextHAIR();
  };

  $scope.goNextHAIR = function() {
    console.log('GoNextHAIR function hit');
    if (ReviewService.subsections.currentHAIR < 9) {
      ReviewService.subsections.currentHAIR += 1;
    } else {
      $location.path('/hair-rating');
    }
  };


}]);
