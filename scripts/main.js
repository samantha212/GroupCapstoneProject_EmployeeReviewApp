var app = angular.module('regisreview', ['ngRoute']);
app.controller('HomeController', ['$scope', '$http', function($scope, $http){
  var userId = {userId: 'dffdfdf'};
  $http.post('/getUserData', userId).then(function(response){
    console.log(response);
  });
}]);
