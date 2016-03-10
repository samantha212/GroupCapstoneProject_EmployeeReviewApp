app.controller('FinancesController', ['$scope', '$http', '$location', 'ReviewService', function($scope, $http, $location, ReviewService){
    ReviewService.checkIfLoggedIn();

    $scope.currentReview = ReviewService.currentReview;
    $scope.financeData = ReviewService.currentReview.subsections[0];

    var role = ReviewService.role;

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
      var leaderIsComp = false;
      var empIsComp = false;

      if(role.leader == true){
        leaderIsComp = true;
      }else{
        empIsComp = true;
      }
      var contentToSend = {regisId: $scope.currentReview.empInfo.RegisId, SectionId: 1, SubsectionId: 1, data: {SS_Actual: $scope.financeData.SS_Actual, SS_Target: $scope.financeData.SS_Target, RS_Actual: $scope.financeData.RS_Actual, RS_Target: $scope.financeData.RS_Target, TS_Actual: $scope.financeData.TS_Actual, TS_Target: $scope.financeData.TS_Target, C_Actual: $scope.financeData.C_Actual, C_Target: $scope.financeData.C_Target, C_Rating: $scope.financeData.C_Rating, SGC_Actual: $scope.financeData.SGC_Actual, SGC_Target: $scope.financeData.SGC_Target, SGC_Rating: $scope.financeData.SGC_Rating, OverallRating: $scope.financeData.OverallRating, isCompleted: empIsComp, isLeaderCompleted: leaderIsComp}};

      $http.post('/updateData', contentToSend).then(function(response){
        if(response.status == 200){
          $scope.goHAIR();
        }
      });
    };

    $scope.putAndGoMap = function() {
      var contentToSend = {
        regisId: $scope.currentReview.empInfo.RegisId, SectionId: 1, SubsectionId: 1,
        data: {SS_Actual: $scope.financeData.SS_Actual, SS_Target: $scope.financeData.SS_Target, RS_Actual: $scope.financeData.RS_Actual, RS_Target: $scope.financeData.RS_Target, TS_Actual: $scope.financeData.TS_Actual, TS_Target: $scope.financeData.TS_Target, C_Actual: $scope.financeData.C_Actual, C_Target: $scope.financeData.C_Target, C_Rating: $scope.financeData.C_Rating, SGC_Actual: $scope.financeData.SGC_Actual, SGC_Target: $scope.financeData.SGC_Target, SGC_Rating: $scope.financeData.SGC_Rating, OverallRating: $scope.financeData.OverallRating
        }
      };
      $http.post('/updateData', contentToSend).then(function(response){
        if(response.status == 200){
          ReviewService.getReview($scope.currentReview.empInfo.RegisId);
          $location.path('/map');
        }
      });
    };

    $scope.goHAIR = function() {
        $scope.setCurrentHAIR(1);
        $location.path('/hair');
    }

}]);
