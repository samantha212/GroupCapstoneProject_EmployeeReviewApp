app.controller('GoalsController', ['$scope', '$http', 'ReviewService', function($scope, $http, ReviewService){
    $scope.currentReviewEmpInfo = ReviewService.currentReview.empInfo;
    $scope.goalData = ReviewService.currentReview.subsections;

    $scope.subsections = ReviewService.subsections;
}]);
