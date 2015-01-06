  angular.module('ui.tree')
  .directive('uiTreeNode', ['uiTreeConfig', '$parse', '$log',
    function(uiTreeConfig, $parse) {
    return {
      restrict: 'EA',
      require: ['?^^uiTreeNode', '^uiTree'],
      replace: true,
      transclude: true,
      scope: true,
      controller: 'uiTreeNodeCtrl',
      controllerAs: '$treeNode',

      templateUrl: function(element) {
        // Gets theme attribute from parent (ui-tree)
        var theme = element.parent().attr('theme') || uiTreeConfig.theme;
        return theme + '/tree-node.tpl.html';
      },

      link: function(scope, element, attrs, ctrls) {
        scope.init(ctrls);

        scope.onSelectCallback = $parse(attrs.onSelect);

        attrs.$observe('collapsed', function() {
          scope.collapsed = attrs.collapsed !== undefined ? scope.$eval(attrs.collapsed) : false;
        });

        attrs.$observe('selected', function() {
          scope.selected = attrs.selected !== undefined ? scope.$eval(attrs.selected) : false;
        });

        attrs.$observe('text', function() {
          if (attrs.text !== undefined) {
            scope.text = scope.$eval(attrs.text);
          }
        });
      }
    };
  }]);