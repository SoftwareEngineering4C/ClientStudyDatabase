(function () {
  'use strict';

  angular
    .module('core')
    .controller('AddStudyController', AddStudyController);
    //AddRequirementController.$inject =  ['ngAnimate', 'ngSanitize', 'ui.bootstrap'];

  function AddStudyController($scope, $state, $window, $sce, Requirements, Studies) {
    var vm = this;

    $scope.requirementsAddedToStudy = [];
    $scope.listOfDatabaseNames = {};

    $scope.loading = true;

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

      Studies.create(newStudy);

      $window.location.href = '/administrator';
    }


    $scope.filterListOfRequirements = function()
    {
      $scope.requirementsNotAddedToStudyandFiltered = [];

      if ($scope.searchEntry != "")
      {
        for (var row in $scope.requirementsNotAddedToStudy)
        {
          if ($scope.requirementsNotAddedToStudy[row]['requirementName'].toLowerCase().search
            ($scope.searchEntry.toLowerCase()) != -1)
          {
            $scope.requirementsNotAddedToStudyandFiltered.push($scope.requirementsNotAddedToStudy[row])
          }
        }
      }
      else
      {
        $scope.requirementsNotAddedToStudyandFiltered = $scope.requirementsNotAddedToStudy;
      }
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



    $scope.isNumeric = function(requirement)
    {
      if (requirement.typeOfRequirement == 'Numeric')
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
