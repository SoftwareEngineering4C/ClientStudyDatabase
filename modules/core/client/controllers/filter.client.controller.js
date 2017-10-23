(function () {
  'use strict';

  angular
    .module('core')
    .controller('FilterController', FilterController);

  function FilterController($scope, Studies, selection) {
    var vm = this;

    $scope.loading = true;

    $scope.makeSelection = function() {
    	var myData = [];
      myData.push()
    }, function(error) {
        $scope.loading = false;
        $scope.error = 'Unable to retrieve studies!\n' + error;
    });
  }
}());
