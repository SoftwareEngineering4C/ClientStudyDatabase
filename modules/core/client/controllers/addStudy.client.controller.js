(function () {
  'use strict';

  angular
    .module('core')
    .controller('AddStudyController', AddStudyController);

  function AddStudyController($scope, $state, $window, $sce, Requirements, Studies) {
    var vm = this;

    $scope.newStudy = {};
    $scope.requirementsAddedToStudy = [];
    $scope.listOfAnswersByIDs = {};
    $scope.searchEntry = "";

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
        return el._id !== requirement._id;
      });
      $scope.filterListOfRequirements();
    }



    $scope.removeRequirementFromStudy = function(requirement)
    {
      //this function removes the requirement from the array
      //that has the same unique id
      $scope.requirementsAddedToStudy = $scope.requirementsAddedToStudy.filter(function(el) {
        return el._id !== requirement._id;
      });

      $scope.requirementsNotAddedToStudy.push(requirement);
      $scope.filterListOfRequirements();
    }



    $scope.addNewStudyToDatabase = function()
    {
      var listOfRequirementsForNewStudy = {};

      for (var i in $scope.requirementsAddedToStudy)
      {
        var currentRequirementID = $scope.requirementsAddedToStudy[i]._id;

        if ($scope.listOfAnswersByIDs[currentRequirementID] != undefined)
        {
          listOfRequirementsForNewStudy[currentRequirementID] = $scope.listOfAnswersByIDs[currentRequirementID];
        }

      }

      $scope.newStudy.requirements = listOfRequirementsForNewStudy;

      $scope.newStudy['inclusion'] = [];
      $scope.newStudy['exclusion'] = [];


      Studies.create($scope.newStudy).then(function(response) {
        $window.location.href = '/administrator';
      }, function(error) {
        console.log(error);
      });

    };


    $scope.filterListOfRequirements = function()
    {
      $scope.requirementsNotAddedToStudyandFiltered = [];

      $scope.requirementsNotAddedToStudyandFiltered = $scope.requirementsNotAddedToStudy.filter(function(requirement) {
        return requirement.requirementName.toLowerCase().search($scope.searchEntry.toLowerCase()) > -1;
      });
    };



  }
}());
