app.controller('StrengthsDevsController', ['$scope', '$http', '$location', 'ReviewService', function($scope, $http, $location, ReviewService){
    $scope.currentReviewEmpInfo = ReviewService.currentReview.empInfo;
    $scope.strengthDevData = ReviewService.currentReview.subsections;

    $scope.subsections = ReviewService.subsections;

    $scope.putCompleteAndGoNextStrengthDev = function() {
        console.log('putCompleteAndGoNextStrengthDev function hit');
        //put that subsection to the DB;
        //Mark subsection as complete.
        $scope.goNextStrengthDev();
    };

    $scope.goNextStrengthDev = function() {
        console.log('goNextStrengthDev function hit');

        if (ReviewService.subsections.currentStrengthDev < 12) {
            $scope.setCurrentStrengthDev(2);
            console.log('current strength/dev:', ReviewService.subsections.currentStrengthDev);
        } else {
            $location.path('/final-rating');
        }
    };


}]);
