'use strict';

/* Filters */

angular.module('SPMassessmentFilters', [])

.filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
})

.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + '%';
  };
}]);
