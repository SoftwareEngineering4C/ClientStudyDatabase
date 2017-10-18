angular.module('core').factory('Studies', ['$http', 
  function($http) {
    var methods = {
      getAll: function() {
        return $http.get('https://localhost:3000/list');
      }
    };

    return methods;
  }
]);
