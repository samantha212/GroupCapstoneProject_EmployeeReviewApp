app.controller('GoalsController', ['$scope', '$http', 'ReviewService', function($scope, $http, ReviewService){
    $scope.goalData = ReviewService.reviews.currentReview[1][$scope.currentGoal];

}]);
