(function () {
  'use strict';

  angular
    .module('core')
    .controller('ManageRequirementsController', ManageRequirementsController);

  function ManageRequirementsController($scope, $window, Requirements) {
    var vm = this;

    $scope.findRequirements = function() {
    	Requirements.getAll().then(function(response) {
        $scope.requirements = response.data;
        $scope.requirementsFiltered = $scope.requirements;

        $scope.requirementsFiltered.sort(function(a, b){
          return a.requirementName > b.requirementName;
        });

      }, function(error) {
        $scope.error = 'Unable to retrieve requirements!\n' + error;
      });
    };


    $scope.filterListOfRequirements = function()
    {
      $scope.requirementsFiltered = [];

      $scope.requirementsFiltered = $scope.requirements.filter(function(requirement) {
        return requirement.requirementName.toLowerCase().search($scope.searchEntry.toLowerCase()) > -1;
      });

      $scope.requirementsFiltered.sort(function(a, b){
        return a.requirementName > b.requirementName;
      });
    };


    $scope.deleteRequirementFromDatabase = function(requirement)
    {
      var id = requirement._id;

      Requirements.delete(id);

      $window.location.href = "/manageRequirements"

    };

  }
}());
