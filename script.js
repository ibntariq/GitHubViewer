// Code goes here
(function(){
  
  var app = angular.module("gitHubViewer", []);
  
  var MainController = function(
    $scope, github, $interval,
    $log, $anchorScroll, $location) {
  
  var onUserComplete = function(data) {
    $scope.user = data;
    github.getRepos($scope.user).then(onRepos, onError);
  };
  
  var onRepos = function(data) {
    $scope.repos = data;
    $location.hash("userDetails");
    $anchorScroll();
  };
  
  var onError = function(reasone) {
    $scope.error = "Could not fetch the data.";
  };
  
  var decrementCountDown = function() {
    $scope.countdown -= 1;
    if ($scope.countdown < 1) {
      $scope.search($scope.username);
    }
  };
  
  var countDownInterval = null;
  var startCountDown  = function() {
    countDownInterval = $interval(decrementCountDown, 1000, $scope.countdown);
  };
  
  $scope.search = function(username) {
    $log.info("searching for " + username);
    github.getUser(username).then(onUserComplete, onError);
    if (countDownInterval) {
      $interval.cancel(countDownInterval);
      $scope.countdown = null;
    }
  };
  
  $scope.username = "Angular";
  $scope.repoSortOrder = "-stargazers_count";
  $scope.countdown = 5;
  
  startCountDown();
};

app.controller("MainController", MainController);
  
}());
