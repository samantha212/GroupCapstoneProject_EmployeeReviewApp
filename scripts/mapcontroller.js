app.controller('MapController', ['$scope', '$http', function($scope, $http){
    $scope.typeField = true;
    $scope.typeSalon = true;

    $scope.financesComplete = true;
    $scope.goalOneComplete = true;
    $scope.goalTwoComplete = true;
    $scope.goalThreeComplete = false;
    $scope.goalFourComplete = false;
    $scope.goalFiveComplete = false;

    $scope.hComplete = true;
    $scope.aComplete = true;
    $scope.iComplete = false;
    $scope.rComplete = false;
    $scope.hairRatingComplete = false;

    $scope.strengthsComplete = true;
    $scope.developmentComplete = false;
    $scope.finalRatingComplete = false;

    $scope.empOneTwo = true;
    $scope.empThreePlus = true;
    $scope.empFivePlus = true;
    $scope.empSix = true;
    $scope.leaderThreePlus = true;
    $scope.leaderThreeFourFive = true;
    $scope.leaderSixPlus = true;
}]);

