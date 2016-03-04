app.controller('MapController', ['$scope', '$http', 'ReviewService', function($scope, $http, ReviewService){
    $scope.currentReview = ReviewService.currentReview;
    $scope.type = ReviewService.type;
}]);
