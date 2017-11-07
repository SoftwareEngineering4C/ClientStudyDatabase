(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);
    //HomeController.$inject =  ['ngAnimate', 'ngSanitize', 'ui.bootstrap'];

  function HomeController($scope, Studies, Requirements) {
    var vm = this;

    $scope.loading = true;
<<<<<<< HEAD
    
=======

>>>>>>> 535adea7ed35b34fbfc00c910ba7401427184429

    $scope.find = function() {

    	Studies.getAll().then(function(response) {
<<<<<<< HEAD
            $scope.loading = false; //remove loader
            $scope.studies = response.data;
            }, function(error) {
=======
        $scope.loading = false; //remove loader
        $scope.studies = response.data;
      }, function(error) {
>>>>>>> 535adea7ed35b34fbfc00c910ba7401427184429
        $scope.loading = false;
        $scope.error = 'Unable to retrieve studies!\n' + error;
      });
  	}

    $scope.showDetails = function(index) {
<<<<<<< HEAD
        $scope.add = $scope.studies[index];
    };

  //***********
      $scope.ageFilter = function(val){
        console.log("here");
        return (val.age_lower_bound < 18);
    }
    
    

  //***********
=======
      $scope.add = $scope.studies[index];
    }

    $scope.deleteStudy = function(study) {
      var id = study._id;

      Studies.delete(id);
      
    }
>>>>>>> 535adea7ed35b34fbfc00c910ba7401427184429


  }


}());
<<<<<<< HEAD









=======
>>>>>>> 535adea7ed35b34fbfc00c910ba7401427184429
