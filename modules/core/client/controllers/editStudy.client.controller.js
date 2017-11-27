(function () {
  'use strict';

  angular
    .module('core')
    .controller('EditController', EditController);
    //HomeController.$inject =  ['ngAnimate', 'ngSanitize', 'ui.bootstrap'];

  function EditController($scope, $window, Studies, $stateParams) {
    var vm = this;

    
    $scope.init = function(){
      $scope.study = $stateParams.study;    
    }
  }

}());
