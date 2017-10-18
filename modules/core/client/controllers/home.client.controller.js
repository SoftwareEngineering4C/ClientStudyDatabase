(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  function HomeController($scope, Studies) {
    var vm = this;

    $scope.loading = true;

    $scope.find = function() {
    	Studies.getAll().then(function(response) {
        $scope.loading = false; //remove loader
        $scope.studies = response.data;
    }, function(error) {
        $scope.loading = false;
        $scope.error = 'Unable to retrieve studies!\n' + error;
    });
  	}
  }
}());
