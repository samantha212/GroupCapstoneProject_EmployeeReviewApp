app.controller('HairRatingController', ['$scope', '$http', '$location', 'ReviewService', function($scope, $http, $location, ReviewService){
  $scope.currentReviewEmpInfo = ReviewService.currentReview.empInfo;
  $scope.hairRatingData = ReviewService.currentReview.subsections;
  $scope.subsections = ReviewService.subsections;

  $scope.putCompleteAndGoStrengths = function() {
    console.log('putCompleteAndGoStrengths function hit');
    //put that subsection to the DB;
    //Mark subsection as complete.
    $scope.goStrengths();

  };

  $scope.goStrengths = function() {
    console.log('current strength/dev:', ReviewService.subsections.currentGoal);
    $scope.setCurrentStrengthDev(1);
    $location.path('/strengths-devs');
  }
}]);
