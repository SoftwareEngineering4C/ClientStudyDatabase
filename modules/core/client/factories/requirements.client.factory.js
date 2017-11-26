angular.module('core').factory('Requirements', ['$http',
  function($http) {
    var methods = {
      getAll: function() {
        return $http.get('http://localhost:3000/api/studies/');
      },

      getOne: function(databaseName) {
        return $http.get('http://localhost:3000/api/studies/' + databaseName);
      },

      create: function(requirement) {
        return $http.post('http://localhost:3000/api/studies/', requirement);
      }
    }
    return methods;
  }
]);
