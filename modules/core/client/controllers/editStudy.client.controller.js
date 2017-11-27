(function () {
  'use strict';

  angular
    .module('core')
    .controller('EditController', EditController);

  function EditController($scope, $window, Studies, $stateParams) {
    var vm = this;


    $scope.init = function() {
      $scope.study = $stateParams.study;
    };

    $scope.addNewInclusionPrinciple = function() {
      console.log($scope.study.inclusion);
    };


  }

}());
