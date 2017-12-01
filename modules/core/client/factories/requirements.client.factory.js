angular.module('core').factory('Requirements', ['$http',
  function($http) {
    var methods = {
      getAll: function() {
        return $http.get('http://localhost:3000/api/requirements/');
      },

      getOne: function(databaseName) {
        return $http.get('http://localhost:3000/api/requirements/' + databaseName);
      },

      create: function(requirement) {
        return $http.post('http://localhost:3000/api/requirements/', requirement);
      },

      delete: function(id) {
        return $http.delete('http://localhost:3000/api/requirements/' + id);
      }

    }
    return methods;
  }
]);
