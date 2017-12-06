angular.module('core').factory('Requirements', ['$http',
  function($http) {
    var methods = {
      getAll: function() {
        return $http.get('https://ufstroke.herokuapp.com/api/requirements/');
      },

      getOne: function(databaseName) {
        return $http.get('https://ufstroke.herokuapp.com/api/requirements/' + databaseName);
      },

      create: function(requirement) {
        return $http.post('https://ufstroke.herokuapp.com/api/requirements/', requirement);
      },

      delete: function(id) {
        return $http.delete('https://ufstroke.herokuapp.com/api/requirements/' + id);
      }

    }
    return methods;
  }
]);
