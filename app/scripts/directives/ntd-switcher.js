'use strict';
(function(){
  function toggleSwitcherDirective() {
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
      },
      template: '<label class="checkbox toggle {{smallClass}}" style="width:{{width}};">' +
        '<input id="{{id}}" name="{{name}}" type="checkbox" checked="">' +
        '<p>' +
            '<span>{{onTitle}}</span>' +
            '<span>{{offTitle}}</span>' +
        '</p>' +
        '<a class="btn btn-primary slide-button"></a>' +
      '</label>',
      link: function(scope, element, attrs) {
        console.log(scope.width);
      }
    };
  }
  angular.module('ntd.directives').directive('toggleSwitcher', [toggleSwitcherDirective]);
}());
