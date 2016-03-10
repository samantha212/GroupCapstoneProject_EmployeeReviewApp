/**
 * Created by samanthamusselman on 3/10/16.
 */
app.controller('HomeController', ['$scope', 'ReviewService', function($scope, ReviewService){
    $scope.thisUser = ReviewService.thisUser;
    $scope.myReview = ReviewService.myReview;

    $scope.myReviewStatuses = ReviewService.myReviewStatuses;
    $scope.type = ReviewService.type;

    $scope.teamReviews = ReviewService.teamReviews;

    $scope.signOwnReview = ReviewService.signOwnReview;
    $scope.loadHomePageInfo = ReviewService.loadHomePageInfo;
    $scope.getReview = ReviewService.getReview;

    $scope.reviewUpdate = function(person) {
        $scope.getReview(person);
    };

    $scope.emailMyPDF = function() {
        //    Regis Corp to use this function to link to their system for emailing PDFs.
        //    This function will email employee's personal PDF to the employee.
    };

    $scope.emailEmpPDF = function(person) {
        //    Regis Corp to use this function to link to their system for emailing PDFs.
        //    This function will email the particular team member's PDF to the leader.
    };
}]);


