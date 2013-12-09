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

app.directive('uiLadda', [function(){
  return {
    link: function postLink(scope, element, attrs) {
      var ladda = Ladda.create(element[0]);

      scope.$watch(attrs.uiLadda, function(newVal, oldVal){
        if (angular.isNumber(oldVal)) {
          if (angular.isNumber(newVal)) {
              ladda.setProgress(newVal);
          } else {
              newVal && ladda.setProgress(0) || ladda.stop();
          }
        } else {
          newVal && ladda.start() || ladda.stop();
        }
      });
    }
  };
}]);


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