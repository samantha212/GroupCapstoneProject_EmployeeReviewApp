app.controller('FinancesController', ['$scope', '$http', 'ReviewService', function($scope, $http, ReviewService){
    var rs = ReviewService.reviews.currentReview[1][0];

    function makePercentage(firstValue, secondValue){
      return ((firstValue / secondValue) * 100).toFixed(1);
    }

    $scope.serviceVariance = rs.SS_Actual - rs.SS_Target;
    $scope.servicePercentOfTarget = makePercentage(rs.SS_Actual, rs.SS_Target);

    $scope.retailVariance = rs.RS_Actual - rs.RS_Target;
    $scope.retailPercentOfTarget = makePercentage(rs.RS_Actual, rs.RS_Target);

    $scope.totalVariance = rs.TS_Actual - rs.TS_Target;
    $scope.totalPercentOfTarget = makePercentage(rs.TS_Actual, rs.TS_Target);

    $scope.contributionVariance = rs.C_Actual - rs.C_Target;
    $scope.contributionPercentOfTarget = makePercentage(rs.C_Actual, rs.C_Target);

    $scope.guestCountVariance = rs.SGC_Actual - rs.SGC_Target;
    $scope.guestCountPercentOfTarget = makePercentage(rs.SGC_Actual, rs.SGC_Target);

    //create dropdown inputs
    $scope.dropDownOption = [
        {id: '0', name: '---Please Select A Rating ---'},
        {id: '3', name: 'Exceeds Expectations = 101.5% and Above'},
        {id: '2', name: 'Meets Expectations = 98.5% - 101.4%'},
        {id: '1', name: 'Does Not Meet Expectations = Below 98.5%'}
      ];

    $scope.tsRating = giveOption(rs.TS_Rating, $scope.dropDownOption);
    $scope.cRating = giveOption(rs.C_Rating, $scope.dropDownOption);
    $scope.sgcRating = giveOption(rs.SGC_Rating, $scope.dropDownOption);
    $scope.overallRating = giveOption(rs.OverallRating, $scope.dropDownOption);

    function giveOption(theRating, theDropDown){
      if(theRating == 1){
        return theDropDown[3];
      }else if(theRating == 2){
        return theDropDown[2];
      }else if(theRating == 3){
        return theDropDown[1];
      }else{
        return theDropDown[0];
      }
    }
}]);
