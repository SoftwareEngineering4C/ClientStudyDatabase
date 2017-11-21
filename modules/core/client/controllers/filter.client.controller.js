(function () {
  'use strict';

  angular
    .module('core')
    .controller('FilterController', FilterController);
    //HomeController.$inject =  ['ngAnimate', 'ngSanitize', 'ui.bootstrap'];

  function FilterController($window, $scope, Studies, Requirements) {
    var vm = this;
    var requirement = {};
    var sortedArrayOfAllDatabaseNamesOfRequirementsPossibleFromFilteredStudies = [];
    var setOfAllRequirementsPossibleFromFilteredStudies = new Set();

    $scope.listOfAnswersByDatabaseName = {};
    $scope.listOfAnswersByRequirement = [];

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
        $scope.sortedArrayOfAllRequirementsPossibleFromFilteredStudies = $scope.requirements;
        $scope.sortedArrayOfAllRequirementsPossibleFromFilteredStudies.sort();
      }, function(error) {
        $scope.loading = false;
        $scope.error = 'Unable to retrieve requirements!\n' + error;
      });
    };

    $scope.init = function()
    {
      $scope.find();
      $scope.findRequirements();
    };



    function findOneRequirement(databaseName, callback, i)
    {
      Requirements.getOne(databaseName).then(function(response) {
        var requirement = response.data;
        callback(requirement, i);
      }, function(error) {
        $scope.loading = false;
      });
    };


    $scope.filterStudies = function()
    {
      $scope.noStudiesThatMatchParameters = false;
      $scope.listOfAnswersByRequirement = [];
      $scope.studiesThatMatchFilterParameters = $scope.studies;

      //removes all empty requirements
      Object.keys($scope.listOfAnswersByDatabaseName).forEach(function(i) {
          if ($scope.listOfAnswersByDatabaseName[i] === "" || $scope.listOfAnswersByDatabaseName[i] === undefined) delete $scope.listOfAnswersByDatabaseName[i];
      });

      //finds list of requirements from list of answers using database name of requirement
      Object.keys($scope.listOfAnswersByDatabaseName).forEach(function(i) {
        $scope.listOfAnswersByRequirement = $scope.listOfAnswersByRequirement.concat($scope.requirements.filter(function(requirement) {
          return i === requirement.databaseName
        }));
      });

      Object.keys($scope.listOfAnswersByRequirement).forEach(function(i) {
        var currentRequirement = $scope.listOfAnswersByRequirement[i];
        console.log(currentRequirement);

        if (currentRequirement.typeOfRequirement === "Boolean")
        {
          $scope.studiesThatMatchFilterParameters = $scope.studiesThatMatchFilterParameters.filter(function(study) {
            if (study[currentRequirement.databaseName] != undefined)
            {
              //filters by checking if the study's requirement value is equal to the answer from the html page
              return study[currentRequirement.databaseName] === $scope.listOfAnswersByDatabaseName[currentRequirement.databaseName];
            }
          });
        }
        else if (currentRequirement.typeOfRequirement === "Range")
        {
          $scope.studiesThatMatchFilterParameters = $scope.studiesThatMatchFilterParameters.filter(function(study) {
            if (study[currentRequirement.databaseName] != undefined && $scope.listOfAnswersByDatabaseName[currentRequirement.databaseName] != "")
            {
              if (study[currentRequirement.databaseName].lower_bound != undefined && study[currentRequirement.databaseName].upper_bound != undefined)
              {
                return study[currentRequirement.databaseName].lower_bound <= $scope.listOfAnswersByDatabaseName[currentRequirement.databaseName]
                  && study[currentRequirement.databaseName].upper_bound >= $scope.listOfAnswersByDatabaseName[currentRequirement.databaseName];
              }
              else if (study[currentRequirement.databaseName].lower_bound != undefined)
              {
                return study[currentRequirement.databaseName].lower_bound <= $scope.listOfAnswersByDatabaseName[currentRequirement.databaseName];
              }
              else if (study[currentRequirement.databaseName].upper_bound != undefined)
              {
                return study[currentRequirement.databaseName].upper_bound >= $scope.listOfAnswersByDatabaseName[currentRequirement.databaseName];
              }
            }
          });
        }
      });

      if ($scope.studiesThatMatchFilterParameters.length > 0)
      {
        findAllRequirementsAvailableInFilteredStudies();
      }
      else
      {
        $scope.noStudiesThatMatchParameters = true;
      }

    };


    function findAllRequirementsAvailableInFilteredStudies()
    {
      setOfAllRequirementsPossibleFromFilteredStudies.clear();
      $scope.sortedArrayOfAllRequirementsPossibleFromFilteredStudies = [];

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

      var sortedArrayOfAllDatabaseNamesOfRequirementsPossibleFromFilteredStudies =
        Array.from(setOfAllRequirementsPossibleFromFilteredStudies).sort();

      var arrayOfAllRequirementsPossibleFromFilteredStudies = [];
      $scope.sortedArrayOfAllRequirementsPossibleFromFilteredStudies = [];

      sortedArrayOfAllDatabaseNamesOfRequirementsPossibleFromFilteredStudies.forEach(function(i) {
        $scope.sortedArrayOfAllRequirementsPossibleFromFilteredStudies = $scope.sortedArrayOfAllRequirementsPossibleFromFilteredStudies.concat($scope.requirements.filter(function(requirement) {
          return i === requirement.databaseName
        }));
      });
    }



    $scope.action = function()
    {
      console.log($scope.listOfAnswersByDatabaseName);

    };

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


  };
}());
