/* flash message */
(function () {
  'use strict';
  function flashAlertDirective(flashMessage, $rootScope, $timeout) {
    function build_msg(type, message) {
      var html = '<div class="alert alert-' + type + '">' +
          message +
          '<button type="button" class="close">×</button>' +
        '</div>' ;
      return html;
    }
    return {
      restrict: 'EAC',
      scope: true,     
      link: function ($scope, element, attr) {
        var html_fragement = '', flag = false;
        $rootScope.$on('event:flashMessageEvent', function (event ,msg) {
          if(angular.isArray(msg)){
            angular.forEach(msg, function(item, key){
              html_fragement += build_msg(item.state, item.info);
            });
          } else {
            html_fragement += build_msg(msg.state, msg.info);
          }
        });

        $rootScope.$on('$routeChangeSuccess', function() {
          if(html_fragement) {
            element.append(html_fragement);
            $('.close', element).bind('click', function() {
              $(this).parent('.alert').remove();
            });
            html_fragement ='';
          } else {
            element.empty();
          }
        });
      }
    };
  }

  angular.module('ntd.directives').directive('flashAlert', [
    'flashMessage',
    '$rootScope',
    '$timeout',
    flashAlertDirective
  ]);
}());
