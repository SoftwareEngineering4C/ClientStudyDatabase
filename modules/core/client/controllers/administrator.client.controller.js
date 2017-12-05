(function () {
  'use strict';

  angular
    .module('core')
    .controller('AdministratorController', AdministratorController);

  function AdministratorController($scope, $state, $window, Studies, Archive) {
    var vm = this;

    $scope.find = function() {
    	Studies.getAll().then(function(response) {
        $scope.loading = false; //remove loader
        $scope.studies = response.data;
      }, function(error) {
        $scope.loading = false;
        $scope.error = 'Unable to retrieve studies!\n' + error;
      });
  	};

    $scope.deleteStudy = function(study) {
      var id = study._id;

      Studies.delete(id).then(function(response) {
        $window.location.href = '/administrator';
      }, function(error) {
        console.log(error);
      });
    }

    $scope.archiveStudy = function(study) {

      var id = study._id;
      Studies.delete(id).then(function(response) {

      }, function(error) {
        console.log(error);
      });

      Archive.create(study).then(function(response) {
        $window.location.href = '/administrator';
      }, function(error) {
        console.log(error);
      });
    };
  }
}());
