(function () {
  'use strict';

  angular
    .module('core')
    .controller('FilterController', FilterController);

  function FilterController($window, $scope, Studies, Requirements, $http) {
    var vm = this;
    var requirement = {};
    var sortedArrayOfAllIDssOfRequirementsPossibleFromFilteredStudies = [];
    var setOfAllRequirementsPossibleFromFilteredStudies = new Set();

    $scope.listOfAnswersByIDs = {};
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

        //sort by priority then name
        $scope.sortedArrayOfAllRequirementsPossibleFromFilteredStudies.sort(function(a, b) {
          return [a.priority, a.requirementName] > [b.priority, b.requirementName] ? 1:-1;
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
      Object.keys($scope.listOfAnswersByIDs).forEach(function(i) {
          if ($scope.listOfAnswersByIDs[i] === "" || $scope.listOfAnswersByIDs[i] === undefined) delete $scope.listOfAnswersByIDs[i];
      });

      //finds list of requirements from list of answers using database name of requirement
      Object.keys($scope.listOfAnswersByIDs).forEach(function(i) {
        $scope.listOfAnswersByRequirement = $scope.listOfAnswersByRequirement.concat($scope.requirements.filter(function(requirement) {
          return i === requirement._id
        }));
      });

      Object.keys($scope.listOfAnswersByRequirement).forEach(function(i) {
        var currentRequirement = $scope.listOfAnswersByRequirement[i];

        if (currentRequirement.typeOfRequirement === "Boolean")
        {
          $scope.studiesThatMatchFilterParameters = $scope.studiesThatMatchFilterParameters.filter(function(study) {
            var requirementFromStudyMatchingCurrentFilterParameter = study.requirements[currentRequirement._id];

            if (requirementFromStudyMatchingCurrentFilterParameter != undefined)
            {
              //filters by checking if the study's requirement value is equal to the answer from the html page
              return requirementFromStudyMatchingCurrentFilterParameter === $scope.listOfAnswersByIDs[currentRequirement._id];
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
            var requirementFromStudyMatchingCurrentFilterParameter = study.requirements[currentRequirement._id];

            if (requirementFromStudyMatchingCurrentFilterParameter != undefined && $scope.listOfAnswersByIDs[currentRequirement._id] != "")
            {
              if (requirementFromStudyMatchingCurrentFilterParameter.lower_bound != undefined && requirementFromStudyMatchingCurrentFilterParameter.upper_bound != undefined)
              {
                return requirementFromStudyMatchingCurrentFilterParameter.lower_bound <= $scope.listOfAnswersByIDs[currentRequirement._id]
                  && requirementFromStudyMatchingCurrentFilterParameter.upper_bound >= $scope.listOfAnswersByIDs[currentRequirement._id];
              }
              else if (requirementFromStudyMatchingCurrentFilterParameter.lower_bound != undefined)
              {
                return requirementFromStudyMatchingCurrentFilterParameter.lower_bound <= $scope.listOfAnswersByIDs[currentRequirement._id];
              }
              else if (requirementFromStudyMatchingCurrentFilterParameter.upper_bound != undefined)
              {
                return requirementFromStudyMatchingCurrentFilterParameter.upper_bound >= $scope.listOfAnswersByIDs[currentRequirement._id];
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
            var requirementFromStudyMatchingCurrentFilterParameter = study.requirements[currentRequirement._id];

            if (requirementFromStudyMatchingCurrentFilterParameter != undefined)
            {
              //filters by checking if the study's requirement value is equal to the answer from the html page
              return requirementFromStudyMatchingCurrentFilterParameter.toLowerCase() === $scope.listOfAnswersByIDs[currentRequirement._id].toLowerCase();
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
        angular.forEach($scope.studiesThatMatchFilterParameters[i].requirements, function(value, key) {
          setOfAllRequirementsPossibleFromFilteredStudies.add(key);
        })
      }

      //adds list of answers
      angular.forEach($scope.listOfAnswersByIDs, function(value, key) {
        setOfAllRequirementsPossibleFromFilteredStudies.add(key);
      })

      setOfAllRequirementsPossibleFromFilteredStudies.add(requirement._id);

      var arrayOfAllIDssOfRequirementsPossibleFromFilteredStudies =
        Array.from(setOfAllRequirementsPossibleFromFilteredStudies);

      var arrayOfAllRequirementsPossibleFromFilteredStudies = [];
      $scope.sortedArrayOfAllRequirementsPossibleFromFilteredStudies = [];

      arrayOfAllIDssOfRequirementsPossibleFromFilteredStudies.forEach(function(i) {
        $scope.sortedArrayOfAllRequirementsPossibleFromFilteredStudies = $scope.sortedArrayOfAllRequirementsPossibleFromFilteredStudies.concat($scope.requirements.filter(function(requirement) {
          return i === requirement._id;
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
