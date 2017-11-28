(function () {
  'use strict';

  angular
    .module('core')
    .controller('FilterController', FilterController);
    //HomeController.$inject =  ['ngAnimate', 'ngSanitize', 'ui.bootstrap'];

  function FilterController($window, $scope, Studies, Requirements,$http) {
    var vm = this;
    var requirement = {};
    var sortedArrayOfAllDatabaseNamesOfRequirementsPossibleFromFilteredStudies = [];
    var setOfAllRequirementsPossibleFromFilteredStudies = new Set();

    $scope.listOfAnswersByDatabaseName = {};

    $scope.loading = true;
    $scope.sortedArrayOfAllRequirementsPossibleFromFilteredStudies = [];

    $scope.find = function() {
    	Studies.getAll().then(function(response) {
            $scope.loading = false; //remove loader
            $scope.studies = response.data;
            $scope.studiesThatMatchFilterParameters = $scope.studies;
            }, function(error) {
        $scope.loading = false;
        $scope.error = 'Unable to retrieve studies!\n' + error;
      });
  	};

    $scope.findRequirements = function() {
    	Requirements.getAll().then(function(response) {
        $scope.loading = false; //remove loader
        $scope.requirements = response.data;
      }, function(error) {
        $scope.loading = false;
        $scope.error = 'Unable to retrieve requirements!\n' + error;
      });
    };

    $scope.findRequirements();



    function findOneRequirement(databaseName, callback, i)
    {
      Requirements.getOne(databaseName).then(function(response) {
        var requirement = response.data;
        callback(requirement, i);
      }, function(error) {
        $scope.loading = false;
      });
    };


    $scope.filterStudies = function(index)
    {
      setOfAllRequirementsPossibleFromFilteredStudies.clear();
      $scope.sortedArrayOfAllRequirementsPossibleFromFilteredStudies = [];

      $scope.studiesThatMatchFilterParameters = $scope.studies.filter(function(study) {
        return study.gender === undefined;
      });

      $scope.studiesThatMatchFilterParameters = $scope.studies.filter(function(study) {
        if (study.age != undefined)
        {
          if (study.age.lower_bound != undefined && study.age.upper_bound != undefined)
          {
            return study.age.lower_bound <= $scope.filter.age
              && study.age.upper_bound >= $scope.filter.age;
          }
        }
      });

      console.log($scope.studiesThatMatchFilterParameters);
      console.log($scope.listOfAnswersByDatabaseName);

      findAllRequirementsAvailableInFilteredStudies(index);
    };


    function findAllRequirementsAvailableInFilteredStudies(index)
    {
      for (var i = 0; i < $scope.studiesThatMatchFilterParameters.length; i++)
      {
        angular.forEach($scope.studiesThatMatchFilterParameters[i], function(value, key) {
          if (key.includes("inclusion") || key.includes("exclusion"))
          {

          }
          else
          {
            setOfAllRequirementsPossibleFromFilteredStudies.add(key);
          }
        })
      }

      setOfAllRequirementsPossibleFromFilteredStudies.delete("$$hashKey");
      setOfAllRequirementsPossibleFromFilteredStudies.delete("_id");
      setOfAllRequirementsPossibleFromFilteredStudies.delete("study_name");
      setOfAllRequirementsPossibleFromFilteredStudies.delete("description");
      setOfAllRequirementsPossibleFromFilteredStudies.delete("age");


      var sortedArrayOfAllDatabaseNamesOfRequirementsPossibleFromFilteredStudies =
        Array.from(setOfAllRequirementsPossibleFromFilteredStudies).sort();

      var arrayOfAllRequirementsPossibleFromFilteredStudies = [];
      $scope.sortedArrayOfAllRequirementsPossibleFromFilteredStudies.splice(index, sortedArrayOfAllDatabaseNamesOfRequirementsPossibleFromFilteredStudies.length - index);

      for (var i = 0; i < sortedArrayOfAllDatabaseNamesOfRequirementsPossibleFromFilteredStudies.length; i++)
      {
        findOneRequirement(sortedArrayOfAllDatabaseNamesOfRequirementsPossibleFromFilteredStudies[i], callbackToFindOneRequirement, i);
      }

    }

    function callbackToFindOneRequirement(requirement, i)
    {
      if (requirement != null)
      {
        $scope.sortedArrayOfAllRequirementsPossibleFromFilteredStudies[i] = requirement;
      }
    }

    $scope.action = function()
    {
      console.log($scope.listOfAnswersByDatabaseName);
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
    };

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
    };



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
	
	$scope.postData = {};

    $scope.postMail = function (contact,study) {
      // Check form validation
      
      // wrap all your input values in $scope.postData
      $scope.postData = angular.copy({contact,study});
	  console.log($scope.postData);

      $http.post('/api/contact', $scope.postData)
        .success(function(data) {
          // Show success message
        })
        .error(function(data) {
          // Show error message
        });
    };
  };


}());
