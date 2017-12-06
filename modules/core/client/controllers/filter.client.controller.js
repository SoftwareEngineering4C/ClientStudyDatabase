(function () {
  'use strict';

  angular
    .module('core')
    .controller('FilterController', FilterController);

  function FilterController($window, $scope, Studies, Requirements, $http) {
    var vm = this;
    var requirement = {};
    var sortedArrayOfAllDatabaseNamesOfRequirementsPossibleFromFilteredStudies = [];
    var setOfAllRequirementsPossibleFromFilteredStudies = new Set();

    $scope.listOfAnswersByDatabaseName = {};
    $scope.listOfAnswersByRequirement = [];
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

        $scope.sortedArrayOfAllRequirementsPossibleFromFilteredStudies.sort(function(a, b) {
          return a.requirementName < b.requirementName;
        });

        $scope.sortedArrayOfAllRequirementsPossibleFromFilteredStudies.sort(function(a, b) {
          return a.priority > b.priority;
        });


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



    $scope.filterStudies = function(requirement)
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

        if (currentRequirement.typeOfRequirement === "Boolean")
        {
          $scope.studiesThatMatchFilterParameters = $scope.studiesThatMatchFilterParameters.filter(function(study) {
            if (study[currentRequirement.databaseName] != undefined)
            {
              //filters by checking if the study's requirement value is equal to the answer from the html page
              return study[currentRequirement.databaseName] === $scope.listOfAnswersByDatabaseName[currentRequirement.databaseName];
            }
            else
            {
              return true;
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
            else
            {
              return true;
            }
          });
        }
        else if (currentRequirement.typeOfRequirement === "Custom")
        {
          $scope.studiesThatMatchFilterParameters = $scope.studiesThatMatchFilterParameters.filter(function(study) {
            if (study[currentRequirement.databaseName] != undefined)
            {
              //filters by checking if the study's requirement value is equal to the answer from the html page
              return study[currentRequirement.databaseName].toLowerCase() === $scope.listOfAnswersByDatabaseName[currentRequirement.databaseName].toLowerCase();
            }
            else
            {
              return true;
            }
          });
        }
      });

      if ($scope.studiesThatMatchFilterParameters.length > 0)
      {
        findAllRequirementsAvailableInFilteredStudies(requirement);
      }
      else
      {
        $scope.noStudiesThatMatchParameters = true;
      }

    };


    function findAllRequirementsAvailableInFilteredStudies(requirement)
    {
      setOfAllRequirementsPossibleFromFilteredStudies.clear();
      $scope.sortedArrayOfAllRequirementsPossibleFromFilteredStudies = [];

      for (var i = 0; i < $scope.studiesThatMatchFilterParameters.length; i++)
      {
        angular.forEach($scope.studiesThatMatchFilterParameters[i], function(value, key) {
          setOfAllRequirementsPossibleFromFilteredStudies.add(key);
        })
      }

      //adds list of answers
      angular.forEach($scope.listOfAnswersByDatabaseName, function(value, key) {
        setOfAllRequirementsPossibleFromFilteredStudies.add(key);
      })

      setOfAllRequirementsPossibleFromFilteredStudies.add(requirement.databaseName);

      setOfAllRequirementsPossibleFromFilteredStudies.delete("$$hashKey");
      setOfAllRequirementsPossibleFromFilteredStudies.delete("_id");
      setOfAllRequirementsPossibleFromFilteredStudies.delete("study_name");
      setOfAllRequirementsPossibleFromFilteredStudies.delete("description");

      var arrayOfAllDatabaseNamesOfRequirementsPossibleFromFilteredStudies =
        Array.from(setOfAllRequirementsPossibleFromFilteredStudies);

      var arrayOfAllRequirementsPossibleFromFilteredStudies = [];
      $scope.sortedArrayOfAllRequirementsPossibleFromFilteredStudies = [];

      arrayOfAllDatabaseNamesOfRequirementsPossibleFromFilteredStudies.forEach(function(i) {
        $scope.sortedArrayOfAllRequirementsPossibleFromFilteredStudies = $scope.sortedArrayOfAllRequirementsPossibleFromFilteredStudies.concat($scope.requirements.filter(function(requirement) {
          return i === requirement.databaseName;
        }));
      });

      $scope.sortedArrayOfAllRequirementsPossibleFromFilteredStudies.sort(function(a, b) {
        return a.requirementName < b.requirementName;
      });

      $scope.sortedArrayOfAllRequirementsPossibleFromFilteredStudies.sort(function(a, b) {
        return a.priority > b.priority;
      });

    }


	$scope.postData = {};
  $scope.contact = {
    name: "",
    message: ""
  };

    $scope.postMail = function (study) {
      // Check form validation
      var contact = $scope.contact;

      // wrap all your input values in $scope.postData
      $scope.postData = angular.copy({contact,study});

      $http.post('/api/contact', $scope.postData)
        .success(function(data) {
          // Show success message
          $window.location.href = '/filter';
        })
        .error(function(data) {
          // Show error message
        });
    };
  };

}());
