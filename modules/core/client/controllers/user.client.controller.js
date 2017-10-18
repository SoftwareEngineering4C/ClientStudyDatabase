(function () {
  'use strict';

  angular
    .module('core')
    .controller('UserController', ['$scope', 'Listings', 
  	
  	function($scope, Listings) {
	    $scope.studies = Studies.getAll();
  	}
  	])
}());