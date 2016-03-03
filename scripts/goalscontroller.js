app.controller('GoalsController', ['$scope', '$http', '$location', 'ReviewService', function($scope, $http, $location, ReviewService){
    $scope.currentReviewEmpInfo = ReviewService.currentReview.empInfo;
    $scope.goalData = ReviewService.currentReview.subsections;
    var role = ReviewService.role;

    $scope.subsections = ReviewService.subsections;

    $scope.putCompleteAndGoNextGoal = function() {
      var leaderIsComp = false;
      var empIsComp = false;

      if(role.leader == true){
        leaderIsComp = true;
      }else{
        empIsComp = true;
      }
      var contentToSend = {regisId: $scope.currentReviewEmpInfo.RegisId, SectionId: 2, SubsectionId: ReviewService.subsections.currentGoal, data: {Goal: $scope.goalData[ReviewService.subsections.currentGoal].Goal, EmployeeResponse: $scope.goalData[ReviewService.subsections.currentGoal].EmployeeResponse, LeaderResponse: $scope.goalData[ReviewService.subsections.currentGoal].LeaderResponse, EmployeeGoalRating: $scope.goalData[ReviewService.subsections.currentGoal].EmployeeGoalRating, LeaderGoalRating: $scope.goalData[ReviewService.subsections.currentGoal].LeaderGoalRating, isCompleted: empIsComp, isLeaderCompleted: leaderIsComp}};

      $http.post('/updateData', contentToSend).then(function(response){
        if(response.status == 200){
          $scope.goNextGoal();
        }
      });
    };

    $scope.putAndGoMap = function(){
      var leaderIsComp = false;
      var empIsComp = false;

      if(role.leader == true){
        leaderIsComp = true;
      }else{
        empIsComp = true;
      }
      var contentToSend = {regisId: $scope.currentReviewEmpInfo.RegisId, SectionId: 2, SubsectionId: ReviewService.subsections.currentGoal, data: {Goal: $scope.goalData[ReviewService.subsections.currentGoal].Goal, EmployeeResponse: $scope.goalData[ReviewService.subsections.currentGoal].EmployeeResponse, LeaderResponse: $scope.goalData[ReviewService.subsections.currentGoal].LeaderResponse, EmployeeGoalRating: $scope.goalData[ReviewService.subsections.currentGoal].EmployeeGoalRating, LeaderGoalRating: $scope.goalData[ReviewService.subsections.currentGoal].LeaderGoalRating, isCompleted: empIsComp, isLeaderCompleted: leaderIsComp}};

      $http.post('/updateData', contentToSend).then(function(response){
        if(response.status == 200){
          $location.path('/map');
        }
      });
    };

    $scope.goNextGoal = function() {
        if (ReviewService.subsections.currentGoal < 5) {
            var newGoal = ReviewService.subsections.currentGoal + 1;
            $scope.setCurrentGoal(newGoal);
        } else {
            console.log('current goal', ReviewService.subsections.currentGoal);
            $scope.setCurrentHAIR(1);
            $location.path('/hair');
        }
    };

}]);
