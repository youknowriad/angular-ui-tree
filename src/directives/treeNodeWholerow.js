  angular.module('ui.tree')
  .directive('uiTreeNodeWholerow', [function() {
    return {
      restrict: 'A',
      require: '^uiTreeNode',
      link: function(scope, element) {
        element.bind("click", function($event) {
          $event.stopImmediatePropagation();
          scope.headerClick($event);
        });

        element.bind('mouseover', function($event) {
          $event.stopImmediatePropagation();
          scope.headerHover($event);
        });

        element.bind('mouseleave', function($event) {
          $event.stopImmediatePropagation();
          scope.headerUnhover($event);
        });

        scope.$watch('selected', function(selected) {
          if (selected) {
            element.addClass('ui-tree-node-wholerow-selected');
          } else {
            element.removeClass('ui-tree-node-wholerow-selected');
          }
        });

        scope.$watch('hovered', function(hovered) {
          if (hovered) {
            element.addClass('ui-tree-node-wholerow-hover');
          } else {
            element.removeClass('ui-tree-node-wholerow-hover');
          }
        });

      }
    };
  }]);