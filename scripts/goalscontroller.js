app.controller('GoalsController', ['$scope', '$http', 'ReviewService', function($scope, $http, ReviewService){
    //$scope.$digest();

    $scope.goalData = ReviewService.reviews.currentReview[1][ReviewService.subsections.currentGoal];
    $scope.currentReviewEmpInfo = ReviewService.reviews.currentReview[0][0];

    $scope.currentGoal = ReviewService.subsections.currentGoal;
}]);
