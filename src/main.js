
  if (angular.element.prototype.querySelectorAll === undefined) {
    angular.element.prototype.querySelectorAll = function(selector) {
      return angular.element(this[0].querySelectorAll(selector));
    };
  }

  angular.module('ui.tree', [])

  .constant('uiTreeConfig', {
    theme: 'default',
    multiple: false, // if multiple nodes can be selected
  });