app.controller('FinancesController', ['$scope', '$http', '$location', 'ReviewService', function($scope, $http, $location, ReviewService){
    ReviewService.checkIfLoggedIn();
    
    $scope.currentReview = ReviewService.currentReview;
    $scope.financeData = ReviewService.currentReview.subsections[0];

    $scope.makeVariance = function(firstValue, secondValue){
      return firstValue - secondValue;
    };
     $scope.makePercentage = function(firstValue, secondValue){
       var makePercent = ((firstValue / secondValue) * 100).toFixed(1);
       if(makePercent != 'NaN'){
           var percent = ((firstValue / secondValue) * 100).toFixed(1);
           if (percent != 'Infinity') {
               return percent + '%';
           }
       }
    };

    $scope.putCompleteAndGoHAIR= function() {
        console.log('putCompleteAndGoGoals function hit');
        //put that subsection to the DB;
        $scope.goHAIR();
    };

    $scope.goHAIR = function() {
        $scope.setCurrentHAIR(1);
        $location.path('/hair');
    }

}]);
