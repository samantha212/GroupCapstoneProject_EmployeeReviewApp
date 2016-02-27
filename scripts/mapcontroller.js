app.controller('MapController', ['$scope', '$http', 'ReviewService', function($scope, $http, ReviewService){
    var thisUser = ReviewService.thisUser;
    var mapArray = [];
    $scope.getMapArray = giveMeThisEmployeesMapView;

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

    //***** We need the back end team to update this query to take in the employee's RegisId instead of the plain id. *****
    //We are going to leave this for now, but will need to come back and update the data sent in the POST call.
    //In an object send down the employeeId of the employee you would like to get the current map view information of.
    //Id in the employee information object is the same Id as EmployeeId in the other objects, match the two to know who you are dealing with
    //The 2 in this object is the employee review with the id of 2, once you start getting the client logic running you will want this objects id value to be dynamic to which review you click on, but for now we decided to hard code the employee with the id of 2
    var giveMeThisEmployeesMapView = {Id: 2};
    $http.post('/getmapview', giveMeThisEmployeesMapView).then(function(response){
        console.log(response, 'map view logic');
    });

// ***** We need to come back and connect each of the true/false values above to the response object.
}]);
