angular.module('core').factory('Studies', ['$http',
  function($http) {
    var methods = {
      getAll: function() {
        return $http.get('https://localhost:3000/list');
      },

      create: function(study) {
<<<<<<< HEAD
        return $http.post('https://localhost:3000/api/studies', study);
=======
        return $http.post('http://localhost:3000/api/studies', study);
      },

      delete: function(id) {
        console.log("factory");
        return $http.delete('http://localhost:3000/api/studies/' + id);
>>>>>>> fabe29834e5a719358aa245220fcb4d2bebaa653
      }
    };

    return methods;
  }
]);
