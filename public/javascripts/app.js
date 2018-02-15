/* jshint strict: false */
/* global angular, Ladda, textstatistics */

var app = angular.module('readability', [
  'ui.bootstrap',
  'ui.router'
]);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html',
      controller: 'HomeCtrl'
    });
});

app.directive('uiLadda', function() {
  return {
    link: function postLink(scope, element, attrs) {
      var ladda = Ladda.create(element[0]);

      scope.$watch(attrs.uiLadda, function(newVal, oldVal) {
        if(angular.isNumber(oldVal)) {
          if(angular.isNumber(newVal)) {
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
});

app.directive('popover', function() {
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    templateUrl: 'templates/popover.html'
  };
});

app.filter('words', function() {
  return function(string) {
    var matches = string.match(/[\w\d]+/gi);
    return matches ? matches.length : 0;
  }
});

app.factory('HelpTextSvc', function() {
  return {
    ease: {
      title: 'Flesch Reading Ease',
      text: 'The result is an index number that rates the text on a 100-point scale. The higher the score, the easier it is to understand the document. Authors are encouraged to aim for a score of approximately 60 to 70.'
    },
    fog: {
      title: 'Gunning-Fog Index',
      text: 'The result is your Gunning-Fog index, which is a rough measure of how many years of schooling it would take someone to understand the content. The lower the number, the more understandable the content will be to your visitors. Results over seventeen are reported as seventeen, where seventeen is considered post-graduate level.'
    },
    grade: {
      title: 'Flesch-Kincaid grade level',
      text: 'The result is the Flesch-Kincaid grade level. Like the Gunning-Fog index, it is a rough measure of how many years of schooling it would take someone to understand the content. Negative results are reported as zero, and numbers over twelve are reported as twelve.'
    }
  };
});

app.factory('TextStatisticsSvc', function($q, $http) {
  return {
    loadUrl: function(url, then) {
      $http.get('/fetch?url=' + url)
        .success(function(data, status, headers, config) {
          then(null, data);
        })
        .error(function(data, status, headers, config) {
          then(data.error, data);
        });
    }
  };
});

app.controller('HomeCtrl', function($scope, TextStatisticsSvc, HelpTextSvc) {
  var testUrls = [
  ];

  $scope.processing = false;
  $scope.processingErrors = false;
  $scope.buttonLabel = 'Process';
  $scope.results = [];
  $scope.help = HelpTextSvc;
  $scope.data = {
    urlList: testUrls.join("\n")
  };

  var normalizeUrl = function(string) {
    var url = string;

    if(!/^https?:\/\//i.test(url)) {
      url = 'http://' + url;
    }

    return url;
  };

  $scope.processList = function() {
    var urls = $scope.data.urlList.split(/\r\n|\r|\n/g);

    $scope.processing = true;
    $scope.buttonLabel = 'Processing';
    $scope.results = []; // reset results
    $scope.processingErrors = false;

    urls.forEach(function(url) {
      url = normalizeUrl(url);

      TextStatisticsSvc.loadUrl(url, function(err, data) {
        var result;

        result = {
          ok: true,
          url: data.url,
          data: null
        };

        if(err) {
          $scope.processingErrors = true;
          result.ok = false;
          result.error = err;
        } else {
          result.data = data;
        }

        // push our result
        $scope.results.push(result);

        if($scope.results.length >= urls.length) {
          $scope.processing = false;
          $scope.buttonLabel = "Process";
        }
      });

    });
  };
});
