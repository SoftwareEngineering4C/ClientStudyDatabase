(function () {
  'use strict';

  angular
    .module('core')
    .controller('EditController', EditController);

  function EditController($scope, $state, $window, Studies, $stateParams, Requirements) {
    var vm = this;

    $scope.init = function() {
      $scope.study = $stateParams.study;
      $scope.findRequirements();
      $scope.listOfAnswersByIDs = $scope.study.requirements;
      $scope.searchEntry = "";

    };

    $scope.findRequirements = function() {
    	Requirements.getAll().then(function(response) {
        $scope.requirements = response.data;
        findRequirementsByIDsInStudy()
      }, function(error) {
        $scope.error = 'Unable to retrieve requirements!\n' + error;
      });
    };

    function findRequirementsByIDsInStudy()
    {
      $scope.requirementsInStudy = [];
      $scope.requirementsNotInStudy = $scope.requirements;
      $scope.requirementsNotInStudyAndFiltered = $scope.requirementsNotInStudy;

      for (var id in $scope.listOfAnswersByIDs)
      {
        for (var j in $scope.requirements)
        {
          if (id == $scope.requirements[j]._id)
          {
            var requirement = $scope.requirements[j]
            $scope.requirementsInStudy.push(requirement);
            $scope.requirementsNotInStudy.splice(j, 1);
          }
        }
      }

    }

    $scope.filterListOfRequirements = function() {

      $scope.requirementsNotInStudyAndFiltered = [];

      $scope.requirementsNotInStudyAndFiltered = $scope.requirementsNotInStudy.filter(function(requirement) {
        return requirement.requirementName.toLowerCase().search($scope.searchEntry.toLowerCase()) > -1;
      });

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


    $scope.addRequirementToStudy = function(requirement)
    {
      $scope.requirementsInStudy.push(requirement);

      //this function removes the requirement from the array
      //that has the same unique database name
      $scope.requirementsNotInStudy = $scope.requirementsNotInStudy.filter(function(el) {
        return el._id !== requirement._id;
      });
      $scope.filterListOfRequirements();
    }



    $scope.removeRequirementFromStudy = function(requirement)
    {
      //this function removes the requirement from the array
      //that has the same unique id
      $scope.requirementsInStudy = $scope.requirementsInStudy.filter(function(el) {
        return el._id !== requirement._id;
      });

      $scope.requirementsNotInStudy.push(requirement);
      $scope.filterListOfRequirements();
    }



    $scope.save = function(study) {

      var listOfRequirementsForUpdatedStudy = {};
      var updatedStudy = $scope.study;

      for (var i in $scope.requirementsInStudy)
      {
        var currentRequirementID = $scope.requirementsInStudy[i]._id;

        if ($scope.listOfAnswersByIDs[currentRequirementID] != undefined)
        {
          listOfRequirementsForUpdatedStudy[currentRequirementID] = $scope.listOfAnswersByIDs[currentRequirementID];
        }

      }

      updatedStudy.requirements = listOfRequirementsForUpdatedStudy;

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
