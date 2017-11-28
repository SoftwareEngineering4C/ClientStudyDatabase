(function () {
  'use strict';

  angular
    .module('core')
    .controller('ArchiveController', ArchiveController);
    //ArchiveController.$inject =  ['ngAnimate', 'ngSanitize', 'ui.bootstrap'];

  function ArchiveController($scope, $window, Archive, Studies) {
    var vm = this;

    $scope.loading = true;
    $scope.edit = false;
    $scope.submitted = false;


    $scope.findArchive = function() {
      Archive.getAll().then(function(response) {
            $scope.loading = false; //remove loader
            $scope.archive = response.data;
            }, function(error) {
        $scope.loading = false;
        $scope.error = 'Unable to retrieve studies!\n' + error;
      });
  	}

    $scope.showDetails = function(index) {
      $scope.add = $scope.archive[index];
    }


    $scope.recover = function (study) {
      var id = study._id;
      Archive.delete(id);

      Studies.create(study);
      $window.location.href = '/administrator';
    }

  }

}());
