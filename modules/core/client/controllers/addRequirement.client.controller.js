(function () {
  'use strict';

  angular
    .module('core')
    .controller('AddRequirementController', AddRequirementController);
    //AddRequirementController.$inject =  ['ngAnimate', 'ngSanitize', 'ui.bootstrap'];

  function AddRequirementController($scope, $sce, Requirements) {
    var vm = this;
    var currentlyDisplayedRequirementsHTML = [];
    var requirementHTML = "";
    var trustedHTML = "";

    console.log($scope.lar_consent);

    $scope.requirementsAddedToStudy = [];
    $scope.requirementsNotAddedToStudy = $scope.requirements;

    $scope.loading = true;

    $scope.findRequirements = function() {
    	Requirements.getAll().then(function(response) {
        $scope.loading = false; //remove loader
        $scope.requirements = response.data;
        $scope.requirementsNotAddedToStudy = $scope.requirements;
      }, function(error) {
        $scope.loading = false;
        $scope.error = 'Unable to retrieve requirements!\n' + error;
      });
    };

    function createHTML(requirement)
    {
      requirementHTML = "";

      if (requirement.typeOfRequirement == "Boolean")
      {
        requirementHTML +=
        '<form action="">' +
        '<input type="radio" name="' + requirement.databaseName + '" ng-model="' + requirement.databaseName + '"> True<br></input>' +
        '<input type="radio" name="' + requirement.databaseName + '" ng-model="' + requirement.databaseName + '"> False<br></input>' +
        '</form>' +
        '</div>';

        console.log(requirement.database);
      }
      else if (requirement.typeOfRequirement == "Numeric")
      {
        requirementHTML +=
        '<form action="">' +
        '<label>Number:</label>   ' +
        '<input type="text"><br></input>' +
        '</form>' +
        '</div>';
      }
      else if (requirement.typeOfRequirement == "String")
      {
        requirementHTML +=
        '<form action="">' +
        '<label>String:</label>   ' +
        '<input type="text"><br></input>' +
        '</form>' +
        '</div>';
      }

      trustedHTML = "";
      requirement.trustedHTML = $sce.trustAsHtml(requirementHTML);

    }

    $scope.addRequirementToStudy = function(requirement)
    {
      createHTML(requirement);
      $scope.requirementsAddedToStudy.push(requirement);

      //this function removes the requirement from the array
      //that has the same unique database name
      $scope.requirementsNotAddedToStudy = $scope.requirementsNotAddedToStudy.filter(function(el) {
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
    }
  }
}());
