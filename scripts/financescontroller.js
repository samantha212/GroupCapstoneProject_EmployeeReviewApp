app.controller('FinancesController', ['$scope', '$http', function($scope, $http){

    //$scope.ReviewService = ReviewService
    //All of these variables need to be tied back to the actual data we receive from API.
    //These are just placeholders for now.

    $scope.serviceSalesActual = 30000;
    $scope.serviceTarget = 28000;
    $scope.serviceVariance = $scope.serviceSalesActual - $scope.serviceTarget;
    $scope.servicePercentOfTarget = (($scope.serviceSalesActual / $scope.serviceTarget) * 100).toFixed(1);

    $scope.retailSalesActual = 4700;
    $scope.retailTarget = 5000;
    $scope.retailVariance = $scope.retailSalesActual - $scope.retailTarget;
    $scope.retailPercentOfTarget = (($scope.retailSalesActual / $scope.retailTarget) * 100).toFixed(1);

    $scope.totalSalesActual = 34700;
    $scope.totalTarget = 33000;
    $scope.totalVariance = $scope.totalSalesActual - $scope.totalTarget;
    $scope.totalPercentOfTarget = (($scope.totalSalesActual / $scope.totalTarget) * 100).toFixed(1);

    $scope.contributionActual = 4200;
    $scope.contributionTarget = 4000;
    $scope.contributionVariance = $scope.contributionActual - $scope.contributionTarget;
    $scope.contributionPercentOfTarget = (($scope.contributionActual / $scope.contributionTarget) * 100).toFixed(1);

    $scope.guestCountActual = 315;
    $scope.guestCountTarget = 300;
    $scope.guestCountVariance = $scope.guestCountActual - $scope.guestCountTarget;
    $scope.guestCountPercentOfTarget = (($scope.guestCountActual / $scope.guestCountTarget) * 100).toFixed(1);

    $scope.totalSalesRating = "3 - Exceeds Expectations";
    $scope.contributionRating = "3 - ExceedsExpectations";
    $scope.guestCountRating = "3 - Exceeds Expectations";
    $scope.overallRating = "3 - Exceeds Expectations";

}]);
