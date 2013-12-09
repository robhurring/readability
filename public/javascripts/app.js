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

      $http.get("/fetch?url=" + url)
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
  var testUrls = [
    'http://www.youbeauty.com/face/rouge-ecstasy-lipstick-giorgio-armani',
    'http://www.youbeauty.com/face/columns/makeup-matters/coping-with-cancer-diagnosis'
    ];

  $scope.processing = false;
  $scope.buttonLabel = "Process";
  $scope.results = [];
  $scope.data = {
    urlList: testUrls.join("\n")
  }

  $scope.processList = function(){
    var urls = $scope.data.urlList.split(/\r\n|\r|\n/g)
      , results;

    $scope.processing = true;
    $scope.buttonLabel = "Processing";
    $scope.results = []; // reset results

    urls.forEach(function(url){
      TextStatisticsSvc.loadUrl(url)
        // create our result
        .then(function(stats){
          var result = {
            url: url,
            ok: true,
            stats: {
              ease: stats.fleschKincaidReadingEase(),
              grade: stats.fleschKincaidGradeLevel(),
              fog: stats.gunningFogScore(),
              liau: stats.colemanLiauIndex(),
              smog: stats.smogIndex()
            }
          };

          // since stats is a dog
          delete stats;

          return result;
        }, function(err){
          return {
            url: url,
            ok: false,
            error: err
          };
        })
        // update our results
        .then(function(result){
          $scope.results.push(result);
        })
        // update percentage
        .then(function(){
          if($scope.results.length >= urls.length){
            $scope.processing = false;
            $scope.buttonLabel = "Process";
          }
        });
    });
  }
});
