(function () {
  'use strict';

  angular
    .module('core')
    .controller('ManageRequirementsController', ManageRequirementsController);

  function ManageRequirementsController($scope, $state, $window, Studies, Requirements) {
    var vm = this;

    $scope.findRequirements = function() {
    	Requirements.getAll().then(function(response) {
        $scope.requirements = response.data;
        $scope.requirementsFiltered = $scope.requirements;

        $scope.requirementsFiltered.sort(function(a, b){
          return a.requirementName.toLowerCase() > b.requirementName.toLowerCase();
        });

      }, function(error) {
        $scope.error = 'Unable to retrieve requirements!\n' + error;
      });
    };

    $scope.findStudies = function() {
    	Studies.getAll().then(function(response) {
        $scope.studies = response.data;
      }, function(error) {
        $scope.error = 'Unable to retrieve requirements!\n' + error;
      });
    };

    $scope.init = function()
    {
      $scope.findStudies();
      $scope.findRequirements();
    }


    $scope.filterListOfRequirements = function()
    {
      $scope.requirementsFiltered = [];

      $scope.requirementsFiltered = $scope.requirements.filter(function(requirement) {
        return requirement.requirementName.toLowerCase().search($scope.searchEntry.toLowerCase()) > -1;
      });

      $scope.requirementsFiltered.sort(function(a, b) {
        return a.requirementName.toLowerCase() > b.requirementName.toLowerCase();
      });
    };


    $scope.deleteRequirementFromDatabase = function(requirement)
    {
      var id = requirement._id;

      Requirements.delete(id).then(function(response) {
        $window.location.reload();
      }, function(error) {
        console.log(error);
      });

      //deleteRequirementFromAllStudies(requirement);
    };

    /*
    function deleteRequirementFromAllStudies(requirement)
    {
      //function takes id of requirement that is to be deleted
      //then finds all studies that were using this requirement
      //and converts those to removedRequirement property
      var id = requirement._id;

      for (var i in $scope.studies)
      {
        var newListOfRequirements = {};

        for (var j in $scope.studies[i].requirements)
        {
          if (j == id)
          {
            console.log(j);
            for (var k in $scope.studies[i].requirements)
            {
              if (k != id)
              {
                newListOfRequirements[id] = $scope.studies[i].requirements[k];

                var updatedStudy = $scope.studies[i];
                updatedStudy.requirements = newListOfRequirements;

                console.log(newListOfRequirements);
                console.log(updatedStudy);
              }
            }


          }
        }
        */

        /*
        Studies.update(updatedStudy).then(function(response) {

        }, function(error) {
          console.log(error);
        });
      }



      //$window.location.reload();

    };
    */


  }
}());
