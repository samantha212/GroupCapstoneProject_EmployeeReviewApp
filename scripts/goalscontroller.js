app.controller('GoalsController', ['$scope', '$http', 'ReviewService', function($scope, $http, ReviewService){
  $scope.currentReviewName = "John C. Testington";
  $scope.currentReviewRegisId = "NJU876";

  if ($scope.currentGoal==1) {
   $scope.empGoal = "Goal One";
   $scope.empRating = 3;
   $scope.empComment = "I'm doing great!";
   $scope.leaderRating = 2;
   $scope.leaderComment = "Positive attitude but doesn't follow directions.";
 } else if ($scope.currentGoal==2) {
   $scope.empGoal = "Goal Two";
   $scope.empRating = 3;
   $scope.empComment = "I'm doing great!";
   $scope.leaderRating = 2;
   $scope.leaderComment = "Positive attitude but doesn't follow directions.";
 } else if ($scope.currentGoal==3) {
   $scope.empGoal = "Goal Three";
   $scope.empRating = 3;
   $scope.empComment = "I'm doing great!";
   $scope.leaderRating = 2;
   $scope.leaderComment = "Positive attitude but doesn't follow directions.";
 } else if ($scope.currentGoal==4) {
   $scope.empGoal = "Goal Four";
   $scope.empRating = 3;
   $scope.empComment = "I'm doing great!";
   $scope.leaderRating = 2;
   $scope.leaderComment = "Positive attitude but doesn't follow directions.";
 } else if ($scope.currentGoal==5) {
   $scope.empGoal = "Goal Five";
   $scope.empRating = 3;
   $scope.empComment = "I'm doing great!";
   $scope.leaderRating = 2;
   $scope.leaderComment = "Positive attitude but doesn't follow directions.";
 }




}]);
