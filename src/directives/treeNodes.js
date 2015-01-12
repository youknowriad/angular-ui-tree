  angular.module('ui.tree')
  .directive('uiTreeNodes', ['uiTreeConfig',
    function(uiTreeConfig) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        nodes: '=',
        parent: '='
      },

      templateUrl: function(element) {
        // Gets theme attribute from parent (ui-tree)
        var theme = element.parent().attr('theme') || uiTreeConfig.theme;
        return theme + '/tree-nodes.tpl.html';
      }
    };
  }]);