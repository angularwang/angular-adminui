/**! 
 * @license angular-flash v0.1.5
 * Copyright (c) 2013 William L. Bunselmeyer. https://github.com/wmluke/angular-flash
 * License: MIT
 */
/* flash message */
(function () {
  'use strict';
  function isBlank(str) {
    if (str === null || str === undefined) {
      str = '';
    }
    return (/^\s*$/).test(str);
  }

  function flashAlertDirective(flash, $timeout) {
    return {
      scope: true,
      link: function ($scope, element, attr) {
        var handle;

        $scope.flash = {};

        $scope.$on('$destroy', function () {
          flash.clean();
        });

        function removeAlertClasses() {
          element.removeClass('alert-info');
          element.removeClass('alert-warn');
          element.removeClass('alert-error');
          element.removeClass('alert-success');
        }

        function hide() {
          $scope.flash = {};
          removeAlertClasses();
          if (!isBlank(attr.activeClass)) {
              element.removeClass(attr.activeClass);
          }
        }

        function show(message, type) {
          if (handle) {
              $timeout.cancel(handle);
          }

          $scope.flash.type = type;
          $scope.flash.message = message;
          removeAlertClasses();
          element.addClass('alert-' + type);
          if (!isBlank(attr.activeClass)) {
              element.addClass(attr.activeClass);
          }

          handle = $timeout(hide, 5000);
        }

        flash.subscribe(show, attr.flashAlert);

        /**
         * Fixes timing issues: display the last flash message sent before this directive subscribed.
         */

        if (attr.flashAlert && flash[attr.flashAlert]) {
          show(flash[attr.flashAlert], attr.flashAlert);
        }

        if (!attr.flashAlert && flash.message) {
          show(flash.message, flash.type);
        }
      }
    };
  }

  angular.module('ntd.directives').directive('flashAlert', ['flashMessage', '$timeout', flashAlertDirective]);
}());