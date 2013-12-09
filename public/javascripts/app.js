var app = angular.module('readability', [
  'ui.router',
  'ngCsv'
]);

app.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl'
    })
})

app.factory('TextStatisticsSvc', function(){
  return {
    load: function(text){
      return new TextStatistics(text);
    }
  }
});

app.controller('HomeCtrl', function($scope) {
  $scope.message = 'Hello';
});