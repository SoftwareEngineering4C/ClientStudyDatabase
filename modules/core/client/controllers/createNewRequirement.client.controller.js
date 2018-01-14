(function () {
  'use strict';

  angular
    .module('core')
    .controller('CreateNewRequirementController', CreateNewRequirementController);

  function CreateNewRequirementController($scope, $state, $window, Requirements) {
    var vm = this;

    $scope.newRequirement = {
      name: "",
      type: "Boolean",
      priority: 3,
      customOptions: ["", ""]
    };


    $scope.addRequirementToDatabase = function() {

      if ($scope.newRequirement.name != "")
      {
        var requirement = {
          requirementName: $scope.newRequirement.name,
          typeOfRequirement: $scope.newRequirement.type,
          priority: $scope.newRequirement.priority
        };

        if (requirement.typeOfRequirement == 'Custom')
        {
          requirement.customOptions = $scope.newRequirement.customOptions;
        }

        Requirements.create(requirement).then(function(response) {
          $window.location.href = '/manageRequirements';
        }, function(error) {
          console.log(error);
        });
      }
    }

    $scope.removeOption = function(index) {
      if ($scope.newRequirement.customOptions.length > 2)
      {
        $scope.newRequirement.customOptions.splice(index,1);
      }
    }

    $scope.addAnotherOption = function() {
      $scope.newRequirement.customOptions.push("");
    }
  }

}());
