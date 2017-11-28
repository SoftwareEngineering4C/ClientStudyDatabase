(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  function HomeController($scope, $window, Studies, Requirements, Archive) {
    var vm = this;

    $scope.loading = true;
    $scope.edit = false;
    $scope.submitted = false;


    $scope.find = function() {
    	Studies.getAll().then(function(response) {
            $scope.loading = false; //remove loader
            $scope.studies = response.data;
            }, function(error) {
        $scope.loading = false;
        $scope.error = 'Unable to retrieve studies!\n' + error;
      });
  	}

    $scope.showDetails = function(index) {
      $scope.add = $scope.studies[index];
    }

    $scope.deleteStudy = function(study) {
      var id = study._id;
      Studies.delete(id);
      $window.location.href = '/administrator';
    }

    $scope.archiveStudy = function (study) {
      var id = study._id;
      Studies.delete(id);

      console.log(study);

      Archive.create(study);

    }

  }

}());
