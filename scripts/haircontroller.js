app.controller('HairController', ['$scope', '$http', '$location', '$anchorScroll', 'ReviewService',function($scope, $http, $location, $anchorScroll, ReviewService){
  $scope.currentReviewEmpInfo = ReviewService.currentReview.empInfo;
  $scope.hairData = ReviewService.currentReview.subsections;
  $scope.subsections = ReviewService.subsections;
  var role = ReviewService.role;

  $scope.hairSubsectionH = ReviewService.subsections.currentHAIR == 6;
  $scope.hairSubsectionA = ReviewService.subsections.currentHAIR == 7;
  $scope.hairSubsectionI = ReviewService.subsections.currentHAIR == 8;
  $scope.hairSubsectionR = ReviewService.subsections.currentHAIR == 9;

  $scope.putCompleteAndGoNextHAIR = function() {
    var leaderIsComp = false;
    var empIsComp = false;

    if(role.leader == true){
      leaderIsComp = true;
    }else{
      empIsComp = true;
    }
    var contentToSend = {regisId: $scope.currentReviewEmpInfo.RegisId, SectionId: 3, SubsectionId: ReviewService.subsections.currentHAIR-5, data: {EmployeeResponse: $scope.hairData[ReviewService.subsections.currentHAIR].EmployeeResponse, LeaderResponse: $scope.hairData[ReviewService.subsections.currentHAIR].LeaderResponse, isCompleted: empIsComp, isLeaderCompleted: leaderIsComp}};
    $http.post('/updateData', contentToSend).then(function(response){
      if(response.status == 200){
        $scope.goNextHAIR();
      }
    });
  };

  $scope.putAndGoMap = function() {
    var contentToSend = {regisId: $scope.currentReviewEmpInfo.RegisId, SectionId: 3, SubsectionId: ReviewService.subsections.currentHAIR-5, data: {EmployeeResponse: $scope.hairData[ReviewService.subsections.currentHAIR].EmployeeResponse, LeaderResponse: $scope.hairData[ReviewService.subsections.currentHAIR].LeaderResponse}};
    $http.post('/updateData', contentToSend).then(function(response){
      if(response.status == 200){
        ReviewService.getReview($scope.currentReviewEmpInfo.RegisId);
        $location.path('/map');
      }
    });
  };

  $scope.goNextHAIR = function() {
    console.log('GoNextHAIR function hit');
    if (ReviewService.subsections.currentHAIR < 9) {
      ReviewService.subsections.currentHAIR += 1;
      $anchorScroll('top');
    } else {
      $location.path('/hair-rating');
    }
  };


}]);
