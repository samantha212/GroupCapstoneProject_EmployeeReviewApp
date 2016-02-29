app.controller('HairRatingController', ['$scope', '$http', 'ReviewService', function($scope, $http, ReviewService){
  $scope.currentReviewName = "John C. Testington";
  $scope.currentReviewRegisId = "NJU876";

  $scope.empHairRating = 3;
  $scope.leaderHairRating = 2;
}]);
