(function () {
  'use strict';

  angular
    .module('core')
    .controller('ArchiveController', ArchiveController);

  function ArchiveController($scope, $state, $window, Archive, Requirements, Studies) {
    var vm = this;

    $scope.findArchive = function() {
      Archive.getAll().then(function(response) {
            $scope.archive = response.data;
            $scope.findRequirements();
            }, function(error) {
        $scope.error = 'Unable to retrieve studies!\n' + error;
      });
  	};

    $scope.findRequirements = function() {
      Requirements.getAll().then(function(response) {
            $scope.requirements = response.data;
            $scope.replaceRequirementIDssWithIds();
            }, function(error) {
        $scope.error = 'Unable to retrieve studies!\n' + error;
      });
  	};


    $scope.recover = function (study) {
      var id = study._id;
      Archive.delete(id).then(function(response) {

      }, function(error) {
        console.log(error);
      });

      Studies.create(study).then(function(response) {
        $window.location.href = '/administrator';
      }, function(error) {
        console.log(error);
      });
    };


    $scope.permanentlyDelete = function (study) {
      var id = study._id;
      Archive.delete(id).then(function(response) {
        $window.location.href = '/archive';
      }, function(error) {
        console.log(error);
      });
    };

  }

}());
