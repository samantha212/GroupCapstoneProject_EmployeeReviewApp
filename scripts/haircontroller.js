app.controller('HairController', ['$scope', '$http', function($scope, $http){
  $scope.hairSubsectionH = false;
  $scope.hairSubsectionA = false;
  $scope.hairSubsectionI = false;
  $scope.hairSubsectionR = false;

  $scope.currentReviewName = "John C. Testington";
  $scope.currentReviewRegisId = "NJU876";

  if ($scope.currentHAIR==1) {
   $scope.hairSubsectionH = true;
   $scope.empComment = "I'm doing okay on H.";
   $scope.leaderComment = "Positive attitude but doesn't follow directions.";
 } else if ($scope.currentHAIR==2) {
   $scope.hairSubsectionA = true;
   $scope.empComment = "I'm doing okay on A.";
   $scope.leaderComment = "Positive attitude but doesn't follow directions.";
 } else if ($scope.currentHAIR==3) {
   $scope.hairSubsectionI = true;
   $scope.empComment = "I'm doing okay on I.";
   $scope.leaderComment = "Positive attitude but doesn't follow directions.";
 } else if ($scope.currentHAIR==4) {
   $scope.hairSubsectionR = true;
   $scope.empComment = "I'm doing okay on R.";
   $scope.leaderComment = "Positive attitude but doesn't follow directions.";
 }
}]);
