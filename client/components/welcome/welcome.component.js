(function () {
  'use strict';

  angular
    .module('snaplab.welcome')
    .component('welcome', {
      templateUrl: 'components/welcome/welcome.template.html',
      controller: controller
    });

  function controller() {
  }

  controller.$inject = [];
})();

