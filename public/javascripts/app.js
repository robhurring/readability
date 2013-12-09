var app = angular.module('readability', [
  'ui.router'
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


app.factory('TextStatisticsSvc', function($q, $http){
  return {
    loadUrl: function(url){
      var d = $q.defer();

      $http.get("/scrape?url=" + url)
        .success(function(data, status, headers, config){
          d.resolve(textstatistics(data.text));
        })
        .error(function(data, status, headers, config){
          d.reject(data.error);
        });

      return d.promise;
    }
  }
});

app.controller('HomeCtrl', function($scope, TextStatisticsSvc) {
  $scope.processing = false;

  var urls = [],
    testUrls = [
      'http://proccli.com',
      'http://reddit.com',
      'http://edentech.net'
    ];

  $scope.results = [];
  $scope.data = {
    urlList: testUrls.join("\n")
  }

  $scope.processList = function(){
    var processed = 0
      , total = 0;

    $scope.processing = 0.01;
    $scope.results = [];

    urls = $scope.data.urlList.split(/\r\n|\r|\n/g);
    total = urls.length;

    urls.forEach(function(url){
      TextStatisticsSvc.loadUrl(url)
        // create our result
        .then(function(stats){
          return {url: url, ok: true, stats: stats};
        }, function(err){
          return {url: url, ok: false, error: err};
        })
        // update our results
        .then(function(result){
          processed++;
          $scope.results.push(result);
        })
        // update percentage
        .then(function(){
          if(processed >= total){
            $scope.processing = false;
          }else{
            $scope.processing = Number(processed/total);
          }
        });
    });

    $scope.processing = false;
  }
});
