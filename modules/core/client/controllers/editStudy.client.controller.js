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
      $scope.study.inclusion.push("");
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

    $scope.cancel = function() {
      $window.location.href = '/addStudy';
    };

  }

}());
