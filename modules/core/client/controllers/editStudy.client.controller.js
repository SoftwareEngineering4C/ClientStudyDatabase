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
      $scope.study.inclusion.push("");
      console.log($scope.study.inclusion);

    };

    $scope.addNewExclusionPrinciple = function() {
      $scope.study.exclusion.push("");
    };

    $scope.removeCurrentInclusionPrinciple = function(index) {
      $scope.study.inclusion.splice(index, 1);
    };

    $scope.removeCurrentExclusionPrinciple = function(index) {
      $scope.study.exclusion.splice(index, 1);
    };

    $scope.save = function(study) {

      console.log(study);

      Studies.update(study);
    };

    $scope.cancel = function() {
      $window.location.href = '/administrator';
    };

  }

}());
