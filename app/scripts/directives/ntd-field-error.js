'use strict';
/**
 * Created with JetBrains PhpStorm.
 * User: wangting
 * Date: 13-7-31
 * Time: 上午9:09
 */
angular.module('ntd.directives').directive('fieldError', function() {
  return {
    template: '<div ng-show="showError" ng-transclude></div>',
    restrict: 'EAC',
    transclude: true,
    scope: {
      'for': '='
    },
    link: function(scope) {
      scope.$watch('{v: for.$invalid, d: for.$dirty}| json', function(v, ov) {
        v = JSON.parse(v);
        scope.showError = v.v && v.d;
      });
    }
  };
});
