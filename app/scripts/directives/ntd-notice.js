'use strict';
angular.module('ntd.directives').directive('notice', [
  '$rootScope',
  '$location',
  function($rootScope, $location) {

    var msgObj = {
      'info': 'alert-info',
      'error': 'alert-error',
      'success': 'alert-success',
      'warning': 'alert'
    };

    function buildHtml(message) {
      var noticeHtml = '<div class="alert ' +
                          msgObj[message.state] + '">' +
                          '<strong>' + message.info + '</strong>' +
                          '<button type="button" class="close">x</button>' +
                        '</div>';
      return noticeHtml;
    }

    return {
      restrict: 'EAC',
      replace: false,
      transclude: false,
      link: function(scope, element, attr) {
        $rootScope.$on('event:notification', function(event, message) {
          element.html(buildHtml(message));
          element
            .show()
            .find('button').on('click', function() {
              element.fadeOut();
            });
        });

        scope.$watch(function() {
          return $location.path();
        }, function() {
            element.fadeOut();
        });
      }
    };
  }
]);
