angular.module('core').factory('Studies', ['$http',
  function($http) {
    var methods = {
      getAll: function() {
        return $http.get('https://softwareproject.herokuapp.com/list');
      },

      create: function(study) {
        return $http.post('https://softwareproject.herokuapp.com/api/studies', study);
      },

      delete: function(id) {
        return $http.delete('https://softwareproject.herokuapp.com/api/studies/' + id);
      }
    };

    return methods;
  }
]);
