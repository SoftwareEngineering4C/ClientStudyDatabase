(function () {
  'use strict';

  angular
    .module('core')
    .controller('EditRequirementController', EditRequirementController);

  function EditRequirementController($scope, $state, $window, Requirements, $stateParams) {

        $scope.init = function() {
          $scope.requirement = $stateParams.requirement;
        };

        $scope.save = function(requirement) {
          Requirements.update(requirement).then(function(response) {
            $window.location.href = '/manageRequirements';
          }, function(error) {
            console.log(error);
          });

        };

        $scope.cancel = function() {
          $window.location.href = '/manageRequirements';
        };

      }

    }());
