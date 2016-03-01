app.controller('FinancesController', ['$scope', '$http', 'ReviewService', function($scope, $http, ReviewService){
    var rs = ReviewService.reviews.currentReview[1][0];

    $scope.serverSalesActual = rs.SS_Actual;
    $scope.serviceTarget = rs.SS_Target;
    $scope.serviceVariance = rs.SS_Actual  - rs.SS_Target;
    $scope.servicePercentOfTarget = ((rs.SS_Actual  / rs.SS_Target ) * 100).toFixed(1);

    $scope.retailSalesActual = rs.RS_Actual;
    $scope.retailTarget = rs.RS_Target;
    $scope.retailVariance = $scope.retailSalesActual - $scope.retailTarget;
    $scope.retailPercentOfTarget = (($scope.retailSalesActual / $scope.retailTarget) * 100).toFixed(1);

    $scope.totalSalesActual = rs.TS_Actual;
    $scope.totalTarget = rs.TS_Target;
    $scope.totalVariance = $scope.totalSalesActual - $scope.totalTarget;
    $scope.totalPercentOfTarget = (($scope.totalSalesActual / $scope.totalTarget) * 100).toFixed(1);

    $scope.contributionActual = rs.C_Actual;
    $scope.contributionTarget = rs.C_Target;
    $scope.contributionVariance = $scope.contributionActual - $scope.contributionTarget;
    $scope.contributionPercentOfTarget = (($scope.contributionActual / $scope.contributionTarget) * 100).toFixed(1);

    $scope.guestCountActual = rs.SGC_Actual;
    $scope.guestCountTarget = rs.SGC_Target;
    $scope.guestCountVariance = $scope.guestCountActual - $scope.guestCountTarget;
    $scope.guestCountPercentOfTarget = (($scope.guestCountActual / $scope.guestCountTarget) * 100).toFixed(1);

    //create dropdown inputs
    $scope.dropDownOption = [
        {id: '0', name: '---Please Select A Rating ---'},
        {id: '3', name: 'Exceeds Expectations = 101.5% and Above'},
        {id: '2', name: 'Meets Expectations = 98.5% - 101.4%'},
        {id: '1', name: 'Does Not Meet Expectations = Below 98.5%'}
      ];

    $scope.tsRating = giveOption(rs.TS_Rating);
    $scope.cRating = giveOption(rs.C_Rating);
    $scope.sgcRating = giveOption(rs.SGC_Rating);
    $scope.overallRating = giveOption(rs.OverallRating);

    function giveOption(theRating){
      if(theRating == 1){
        return $scope.dropDownOption[3];
      }else if(theRating == 2){
        return $scope.dropDownOption[2];
      }else if(theRating == 3){
        return $scope.dropDownOption[1];
      }else{
        return $scope.dropDownOption[0];
      }
    }
}]);
