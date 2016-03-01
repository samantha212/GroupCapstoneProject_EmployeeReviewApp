app.controller('StrengthsDevsController', ['$scope', '$http', 'ReviewService', function($scope, $http, ReviewService){
    $scope.strengthDevData = ReviewService.reviews.currentReview[1][$scope.currentStrengthDev];
    $scope.currentReviewEmpInfo = ReviewService.reviews.currentReview[0][0];
}]);
