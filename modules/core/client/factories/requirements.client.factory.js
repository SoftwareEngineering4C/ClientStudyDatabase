angular.module('core').factory('Requirements', ['$http',
  function($http) {
    var methods = {
      getAll: function() {
        return $http.get('http://localhost:3000/api/requirements');
      },

      getOne: function(databaseName) {
        return $http.get('http://localhost:3000/api/requirements/' + databaseName);
      }
    }
    return methods;
  }
]);
