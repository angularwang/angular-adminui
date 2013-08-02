'use strict';
angular.module('ntd.directives').directive('notice', [
  '$rootScope',
  '$location',
  '$timeout',
  function($rootScope, $location, $timeout) {

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
                          '<button type="button" class="close">×</button>' +
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

            if(message.redirect_url) {
              $timeout(function() {
                $location.path(message.redirect_url);
              }, 1500);
            }
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
