app.controller('FinancesController', ['$scope', '$http', 'ReviewService', function($scope, $http, ReviewService){
    $scope.currentReview = ReviewService.currentReview;
    $scope.financeData = ReviewService.currentReview.subsections[0];

    $scope.makeVariance = function(firstValue, secondValue){
      return firstValue - secondValue;
    }
     $scope.makePercentage = function(firstValue, secondValue){
      return ((firstValue / secondValue) * 100).toFixed(1);
    }
}]);
