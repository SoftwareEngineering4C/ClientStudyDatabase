angular.module('core').factory('Archive', ['$http',
  function($http) {
    var methods = {

      getAll: function() {
        return $http.get('http://localhost:3000/api/archive');
      },

      create: function(study) {
        return $http.post('http://localhost:3000/api/archive', study);
      },


      delete: function(id) {
        return $http.delete('http://localhost:3000/api/archive/' + id);
      }
    };

    return methods;
  }
]);
