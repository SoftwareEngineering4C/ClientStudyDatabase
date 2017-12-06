angular.module('core').factory('Studies', ['$http',
  function($http) {
    var methods = {
      getAll: function() {
        return $http.get('https://ufstroke.herokuapp.com/api/studies');
      },

      create: function(study) {
        return $http.post('https://ufstroke.herokuapp.com/api/studies', study);
      },

      delete: function(id) {
        return $http.delete('https://ufstroke.herokuapp.com/api/studies/' + id);
      },

      update: function(study) {
        return $http.put('https://ufstroke.herokuapp.com/api/studies', study);
      }
    };

    return methods;
  }
]);
