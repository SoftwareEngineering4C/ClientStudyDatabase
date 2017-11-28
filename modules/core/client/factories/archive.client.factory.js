angular.module('core').factory('Archive', ['$http',
  function($http) {
    var methods = {

      getAll: function() {
        return $http.get('https://softwareproject.herokuapp.com/api/archive');
      },

      create: function(study) {
        return $http.post('https://softwareproject.herokuapp.com/api/archive', study);
      },


      delete: function(id) {
        return $http.delete('https://softwareproject.herokuapp.com/api/archive/' + id);
      }
    };

    return methods;
  }
]);
