angular.module('core').factory('Requirements', ['$http',
  function($http) {
    var methods = {
      getAll: function() {
        return $http.get('https://softwareproject.herokuapp.com/api/requirements');
      },

      getOne: function(databaseName) {
        return $http.get('https://softwareproject.herokuapp.com/api/requirements/' + databaseName);
      },

      create: function(requirement) {
        return $http.post('https://softwareproject.herokuapp.com/api/requirements', requirement);
      }
    }
    return methods;
  }
]);
