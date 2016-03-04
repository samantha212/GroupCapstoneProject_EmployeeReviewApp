app.controller('FinancesController', ['$scope', '$http', '$location', 'ReviewService', function($scope, $http, $location, ReviewService){
    $scope.currentReview = ReviewService.currentReview;
    $scope.financeData = ReviewService.currentReview.subsections[0];

    $scope.makeVariance = function(firstValue, secondValue){
      return firstValue - secondValue;
    };
     $scope.makePercentage = function(firstValue, secondValue){
       var makePercent = ((firstValue / secondValue) * 100).toFixed(1);
       if(makePercent != 'NaN'){
         return ((firstValue / secondValue) * 100).toFixed(1) + '%';
       }
    };

    $scope.putCompleteAndGoGoals = function() {
        console.log('putCompleteAndGoGoals function hit');
        //put that subsection to the DB;
        $scope.goGoals();
    };

    $scope.goGoals = function() {
        console.log('goGoals function hit');
        ReviewService.subsections.currentGoal = 1;
        $location.path('/goals');
    };


}]);
