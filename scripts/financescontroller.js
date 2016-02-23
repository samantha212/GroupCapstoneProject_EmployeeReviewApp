app.controller('FinancesController', ['$scope', '$http', function($scope, $http){
    //All of these variables need to be tied back to the actual data we receive from API.
    //These are just placeholders for now.
    $scope.emp = true;

    $scope.serviceSalesActual = 30000;
    $scope.serviceTarget = 28000;
    $scope.serviceVariance = 2000;
    $scope.servicePercentOfTarget = 107.1;

    $scope.retailSalesActual = 4700;
    $scope.retailTarget = 5000;
    $scope.retailVariance = -300;
    $scope.retailPercentOfTarget = 94.0;

    $scope.totalSalesActual = 34700;
    $scope.totalTarget = 33000;
    $scope.totalVariance = 1700;
    $scope.totalPercentOfTarget = 105.2;

    $scope.contributionActual = 4200;
    $scope.contributionTarget = 4000;
    $scope.contributionVariance = 200;
    $scope.contributionPercentOfTarget = 105.0;

    $scope.guestCountActual = 315;
    $scope.guestCountTarget = 300;
    $scope.guestCountVariance = 15;
    $scope.guestCountPercentOfTarget = 105.0;

    $scope.empOneTwo = true;
    $scope.empThreePlus = true;
    $scope.empFivePlus = true;
    $scope.leaderThreePlus = true;
    $scope.leaderThreeFourFive = true;
    $scope.leaderSixPlus = true;

}]);
