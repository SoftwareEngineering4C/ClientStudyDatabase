(function () {
  'use strict';

  angular
    .module('core')
    .controller('AdministratorController', AdministratorController);
    //HomeController.$inject =  ['ngAnimate', 'ngSanitize', 'ui.bootstrap'];

  function AdministratorController($scope, Studies) {
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

    $scope.showDetails = function(index) {
      $scope.add = $scope.studies[index];
    }
  }
}());
