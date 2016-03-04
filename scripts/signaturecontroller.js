app.controller('SignatureController', ['$scope', '$http', '$location', 'ReviewService', function($scope, $http, $location, ReviewService){

    $scope.currentReview = ReviewService.currentReview;
    $scope.subsections = ReviewService.subsections;

    $scope.putAndGoHome = function(){
        console.log("sign Button clicked!");
    //  ***  Charlie needs to add put function to this button.
    //    Add form validation to ensure initials entered.
    //    Button is already disabled --  enabled when box is checked.
        $location.path('/map');

    };
}]);
