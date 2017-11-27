(function () {
  'use strict';

  angular
    .module('core')
    .controller('AddStudyController', AddStudyController);

  function AddStudyController($scope, $state, $window, $sce, Requirements, Studies) {
    var vm = this;

    $scope.requirementsAddedToStudy = [];
    $scope.listOfDatabaseNames = {};

    $scope.findRequirements = function() {
    	Requirements.getAll().then(function(response) {
        $scope.loading = false; //remove loader
        $scope.requirements = response.data;
        $scope.requirementsNotAddedToStudy = $scope.requirements;
        $scope.requirementsNotAddedToStudyandFiltered = $scope.requirements;
      }, function(error) {
        $scope.loading = false;
        $scope.error = 'Unable to retrieve requirements!\n' + error;
      });
    };



    $scope.addRequirementToStudy = function(requirement)
    {
      $scope.requirementsAddedToStudy.push(requirement);

      //this function removes the requirement from the array
      //that has the same unique database name
      $scope.requirementsNotAddedToStudy = $scope.requirementsNotAddedToStudy.filter(function(el) {
        return el.databaseName !== requirement.databaseName;
      });
      $scope.requirementsNotAddedToStudyandFiltered = $scope.requirementsNotAddedToStudyandFiltered.filter(function(el) {
        return el.databaseName !== requirement.databaseName;
      });
    }



    $scope.removeRequirementFromStudy = function(requirement)
    {
      //this function removes the requirement from the array
      //that has the same unique database name
      $scope.requirementsAddedToStudy = $scope.requirementsAddedToStudy.filter(function(el) {
        return el.databaseName !== requirement.databaseName;
      });

      $scope.requirementsNotAddedToStudy.push(requirement);
      $scope.requirementsNotAddedToStudyandFiltered.push(requirement);
    }



    $scope.addNewStudyToDatabase = function()
    {
      var newStudy = $scope.listOfDatabaseNames;

      newStudy['inclusion'] = [];
      newStudy['exclusion'] = [];

      Studies.create(newStudy);

      console.log(newStudy);

      $window.location.href = '/administrator';
    }


    $scope.filterListOfRequirements = function()
    {
      $scope.requirementsNotAddedToStudyandFiltered = [];

      $scope.requirementsNotAddedToStudyandFiltered = $scope.requirementsNotAddedToStudy.filter(function(requirement) {
        console.log(requirement.requirementName);
        return requirement.requirementName.toLowerCase().search($scope.searchEntry.toLowerCase()) > -1;
      });
    }



    $scope.isBoolean = function(requirement)
    {
      if (requirement.typeOfRequirement == 'Boolean')
      {
        return true;
      }
      else
      {
        return false;
      }
    }


    $scope.isGender = function(requirement)
    {
      if (requirement.typeOfRequirement == 'Gender')
      {
        return true;
      }
      else
      {
        return false;
      }
    }


    $scope.isRange = function(requirement)
    {
      if (requirement.typeOfRequirement == 'Range')
      {
        return true;
      }
      else
      {
        return false;
      }
    }
  }
}());
