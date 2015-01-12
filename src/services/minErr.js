  angular.module('ui.tree')
  .service('uiTreeMinErr', function() {
    var minErr = angular.$$minErr('ui.tree');
    return function() {
      var error = minErr.apply(this, arguments);
      var message = error.message.replace(new RegExp('\nhttp://errors.angularjs.org/.*'), '');
      return new Error(message);
    };
  });