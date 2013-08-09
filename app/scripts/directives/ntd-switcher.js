'use strict';
(function(){
  function toggleSwitcherDirective($scope, $compile) {
      return {
      restrict: 'AC',
      replace: true,
      scope: {
        onTitle: '@onTitle',
        offTitle: '@offTitle',
        width: '@width',
        smallClass: '@smallClass',
        id: '@',
        name: '@',
        checked: '=ngModel',
        callback: '='
      },
      template: '<label class="checkbox toggle {{smallClass}}" style="width:{{width}};">' +
        '<input id="{{id}}" name="{{name}}" type="checkbox" ng-checked="checked">' +
        '<p>' +
            '<span>{{onTitle}}</span>' +
            '<span>{{offTitle}}</span>' +
        '</p>' +
        '<a class="btn slide-button"></a>' +
      '</label>',
      link: function(scope, element, attrs) {
        element.bind('click', function(event) {
          if (event.target.nodeName.toLowerCase() === 'input') {
            scope.callback();
            scope.$apply();
          }
        });
      }
    };
  }
  angular.module('ntd.directives').directive('toggleSwitcher', ['$compile', toggleSwitcherDirective]);
}());
