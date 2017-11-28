(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  function HomeController($scope, $window, Studies, Requirements) {
    var vm = this;


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

    $scope.archiveStudy = function(study) {
      var id = study._id;
      Studies.delete(id);

      Archive.create(study);

    }

  }


}());
