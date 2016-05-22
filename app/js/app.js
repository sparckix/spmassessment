'use strict';

/* App Module */
$(':checkbox').checkboxpicker();

var module = angular.module('SPMassessment', [
  'ngRoute',
  'SPMassessmentAnimations',
  'angular-loading-bar',
  'SPMassessmentControllers',
  'SPMassessmentFilters',
  'SPMassessmentServices'
]);

module.directive('footer', function () {
    return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: "partials/footer.html",
        controller: ['$scope', '$filter', function ($scope, $filter) {
        }]
    }
});


module.directive('header', function () {
    return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        templateUrl: "partials/header.html",
        controller: ['$scope', '$filter', '$location', function ($scope, $filter, $location) {
           $scope.isActive = function (viewLocation) {
           var active = (viewLocation === $location.path());
           return active;
          };         
        }]
    }
});


module.directive("progressbar", function () {
    return {
        restrict: "A",
        scope: {
          load: '='
        },
        link: function (scope, element) {
          //watch load attribute
          scope.$watch('load', function() {
            //should be i+1 or load+1 in this case
            element.css('width', (scope.load+1) + '%');
          });
        }
    };
});

module.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/main', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).
      when('/assessment', {
        templateUrl: 'partials/assessment.html',
        controller: 'AssessmentCtrl'
      }).      
      when('/phones/:phoneId', {
        templateUrl: 'partials/assessment.html',
        controller: 'AssessmentCtrl'
      }).
      otherwise({
        redirectTo: '/main'
      });
  }]);

module.directive('bsActiveLink', ['$location', function ($location) {
return {
    restrict: 'A', //use as attribute 
    replace: false,
    link: function (scope, elem) {
        //after the route has changed
        scope.$on("$viewContentLoaded", function () {
            var hrefs = ['/#' + $location.path(),
                         '#' + $location.path(), //html5: false
                         $location.path()]; //html5: true
            angular.forEach(elem.find('a'), function (a) {
               a = angular.element(a);
                if (-1 !== hrefs.indexOf(a.attr('href'))) {
                    a.parent().addClass('active');
                } else {
                    a.parent().removeClass('active');   
                };
            });     
        });
    }
}
}]);
