app.controller('FinancesController', ['$scope', '$http', 'ReviewService', function($scope, $http, ReviewService){
    $scope.currentReview = ReviewService.currentReview;
    $scope.financeData = ReviewService.currentReview.subsections[0];
    //var financeData = ReviewService.currentReview.subsections[0];

    function makePercentage(firstValue, secondValue){
      return ((firstValue / secondValue) * 100).toFixed(1);
    }

    $scope.serviceVariance = $scope.financeData.SS_Actual - $scope.financeData.SS_Target;
    $scope.servicePercentOfTarget = makePercentage($scope.financeData.SS_Actual, $scope.financeData.SS_Target);

    $scope.retailVariance = $scope.financeData.RS_Actual - $scope.financeData.RS_Target;
    $scope.retailPercentOfTarget = makePercentage($scope.financeData.RS_Actual, $scope.financeData.RS_Target);

    $scope.totalVariance = $scope.financeData.TS_Actual - $scope.financeData.TS_Target;
    $scope.totalPercentOfTarget = makePercentage($scope.financeData.TS_Actual, $scope.financeData.TS_Target);

    $scope.contributionVariance = $scope.financeData.C_Actual - $scope.financeData.C_Target;
    $scope.contributionPercentOfTarget = makePercentage($scope.financeData.C_Actual, $scope.financeData.C_Target);

    $scope.guestCountVariance = $scope.financeData.SGC_Actual - $scope.financeData.SGC_Target;
    $scope.guestCountPercentOfTarget = makePercentage($scope.financeData.SGC_Actual, $scope.financeData.SGC_Target);

    //create dropdown inputs
    $scope.dropDownOption = [
        {id: '0', name: '---Please Select A Rating ---'},
        {id: '3', name: 'Exceeds Expectations = 101.5% and Above'},
        {id: '2', name: 'Meets Expectations = 98.5% - 101.4%'},
        {id: '1', name: 'Does Not Meet Expectations = Below 98.5%'}
      ];

    $scope.tsRating = giveOption($scope.financeData.TS_Rating, $scope.dropDownOption);
    $scope.cRating = giveOption($scope.financeData.C_Rating, $scope.dropDownOption);
    $scope.sgcRating = giveOption($scope.financeData.SGC_Rating, $scope.dropDownOption);
    $scope.overallRating = giveOption($scope.financeData.OverallRating, $scope.dropDownOption);

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
