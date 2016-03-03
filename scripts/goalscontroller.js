app.controller('GoalsController', ['$scope', '$http', '$location', 'ReviewService', function($scope, $http, $location, ReviewService){
    $scope.currentReviewEmpInfo = ReviewService.currentReview.empInfo;
    $scope.goalData = ReviewService.currentReview.subsections;

    $scope.subsections = ReviewService.subsections;

    $scope.putCompleteAndGoNextGoal = function() {
        console.log('putCompleteAndGoNextGoal function hit');
        //put that subsection to the DB;
        //Mark subsection as complete.
        $scope.goNextGoal();
    };

    $scope.goNextGoal = function() {
        if (ReviewService.subsections.currentGoal < 5) {
            var newGoal = ReviewService.subsections.currentGoal + 1;
            $scope.setCurrentGoal(newGoal);
        } else {
            console.log('current goal', ReviewService.subsections.currentGoal);
            $scope.setCurrentHAIR(1);
            $location.path('/hair');
        }
    };

}]);
