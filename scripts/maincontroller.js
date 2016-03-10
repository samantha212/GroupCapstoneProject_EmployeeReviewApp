app.controller('MainController', ['$scope', '$location', 'ReviewService', function($scope, $location, ReviewService){
    $scope.statuses = ReviewService.statuses;
    $scope.ReviewService = ReviewService;

    $scope.leader = false;
    $scope.emp = false;

    $scope.strengths = false;
    $scope.development = false;

    $scope.hairSubsectionH = true;
    $scope.hairSubsectionA = false;
    $scope.hairSubsectionI = false;
    $scope.hairSubsectionR = false;


    $scope.setCurrentGoal = function(number) {
        ReviewService.subsections.currentGoal = number;
    };

    $scope.setCurrentHAIR = function(number) {
        ReviewService.subsections.currentHAIR = number + 5;
        $scope.setImgHAIR();
    };

    $scope.setImgHAIR = function() {
        if (ReviewService.subsections.currentHAIR == 6) {
            $scope.hairSubsectionH = true;
            $scope.hairSubsectionA  = false;
            $scope.hairSubsectionI  = false;
            $scope.hairSubsectionR  = false;
        } else if (ReviewService.subsections.currentHAIR == 7) {
            $scope.hairSubsectionH = false;
            $scope.hairSubsectionA  = true;
            $scope.hairSubsectionI  = false;
            $scope.hairSubsectionR  = false;
        } else if (ReviewService.subsections.currentHAIR == 8) {
            $scope.hairSubsectionH = false;
            $scope.hairSubsectionA = false;
            $scope.hairSubsectionI = true;
            $scope.hairSubsectionR = false;
        } else {
            $scope.hairSubsectionH  = false;
            $scope.hairSubsectionA  = false;
            $scope.hairSubsectionI  = false;
            $scope.hairSubsectionR  = true;
        }
    };

    $scope.setCurrentStrengthDev = function(number) {
      ReviewService.subsections.currentStrengthDev = number + 10;

      if(number == 1) {
          $scope.strengths = true;
          $scope.development = false;
      } else {
          $scope.strengths = false;
          $scope.development = true;
      }
    };

    $scope.goMap = function() {
        var currentReviewEmpInfo = ReviewService.currentReview.empInfo;

        ReviewService.getReview(currentReviewEmpInfo.RegisId);

        $location.path('/map');
    };

}]);




