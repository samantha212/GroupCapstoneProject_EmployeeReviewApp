app.controller('FinalRatingController', ['$scope', '$http', 'ReviewService', function($scope, $http, ReviewService){
    $scope.currentReviewEmpInfo = ReviewService.currentReview.empInfo;
    $scope.finalData = ReviewService.currentReview.subsections;
    $scope.subsections = ReviewService.subsections;

    $scope.putCompleteAndGoMap = function() {
        console.log('putAndGoMap function hit');
        //put that subsection to the DB;
        //Mark subsection as complete.
        $scope.goMap();
    };


}]);
