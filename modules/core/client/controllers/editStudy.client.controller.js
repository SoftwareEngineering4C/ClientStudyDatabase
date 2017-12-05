(function () {
  'use strict';

  angular
    .module('core')
    .controller('EditController', EditController);

  function EditController($scope, $state, $window, Studies, $stateParams) {
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

    $scope.save = function(study) {
      Studies.update(study).then(function(response) {
        $window.location.href = '/administrator';
      }, function(error) {
        console.log(error);
      });
    };

    $scope.cancel = function() {
      $window.location.href = '/administrator';
    };

  }

}());
