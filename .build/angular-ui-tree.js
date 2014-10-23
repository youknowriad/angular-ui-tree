
/**
@ngdoc overview
@name ui.tree

@description
AngularJS version of the tree directive.
 */
angular.module("ui.tree", ['ui.tree.tpls']);

angular.module("ui.tree.tpls", ['template/tree/default/tree.html', 'template/tree/default/node.html', 'template/tree/list/tree.html', 'template/tree/list/node.html']);

angular.module('ui.tree').controller('TreeController', [
  "$scope", function($scope) {
    var addNode, ctrl, destroyed, nodes, removeNode, selectedNode;
    ctrl = this;
    nodes = ctrl.nodes = $scope.nodes = [];
    selectedNode = null;
    ctrl.addNode = addNode = function(node) {
      nodes.push(node);
    };
    ctrl.removeNode = removeNode = function(node) {
      var index;
      index = nodes.indexOf(node);
      nodes.splice(index, 1);
    };
    ctrl.select = function(node) {
      if (selectedNode && selectedNode !== node) {
        selectedNode.selected = false;
      }
      selectedNode = node;
    };
    ctrl.deselect = function(node) {
      if (selectedNode && selectedNode === node) {
        selectedNode = null;
      }
    };
    destroyed = void 0;
    $scope.$on("$destroy", function() {
      destroyed = true;
    });
    return $scope.test = function() {
      console.log('test');
    };
  }
]);

angular.module('ui.tree').controller('TreeNodeController', [
  "$scope", function($scope) {
    var addNode, ctrl, nodes, parentCtrl, parentTreeNodeCtrl, removeNode, scope, treeCtrl;
    ctrl = this;
    nodes = ctrl.nodes = $scope.nodes = [];
    scope = ctrl.scope = $scope;
    parentTreeNodeCtrl = parentCtrl = treeCtrl = null;
    $scope.init = function(controllersArr) {
      parentTreeNodeCtrl = controllersArr[0];
      treeCtrl = controllersArr[1];
      parentCtrl = (parentTreeNodeCtrl ? parentTreeNodeCtrl : treeCtrl);
      return parentCtrl.addNode(scope);
    };
    ctrl.addNode = addNode = function(node) {
      nodes.push(node);
    };
    ctrl.removeNode = removeNode = function(node) {
      var index;
      index = nodes.indexOf(node);
      nodes.splice(index, 1);
    };
    $scope.toggle = function() {
      return $scope.collapse = !$scope.collapse;
    };
    $scope.expandIconClass = function() {
      if ($scope.expandIcon) {
        return $scope.expandIcon;
      }
      if (parentTreeNodeCtrl) {
        return parentTreeNodeCtrl.scope.expandIconClass();
      }
      return 'glyphicon glyphicon-plus';
    };
    $scope.collapesIconClass = function() {
      if ($scope.collapseIcon) {
        return $scope.collapseIcon;
      }
      if (parentTreeNodeCtrl) {
        return parentTreeNodeCtrl.scope.collapesIconClass();
      }
      return 'glyphicon glyphicon-minus';
    };
    $scope.expandCollapseIconClass = function() {
      if (nodes.length === 0) {
        return $scope.emptyIcon || 'glyphicon';
      }
      if ($scope.collapse) {
        return $scope.expandIconClass();
      }
      return $scope.collapesIconClass();
    };
    $scope.depth = function() {
      if (parentTreeNodeCtrl) {
        return parentTreeNodeCtrl.scope.depth() + 1;
      }
      return 1;
    };
    $scope.select = function() {
      if (!$scope.disabled) {
        $scope.selected = true;
      }
    };
    $scope.$watch('selected', function(active) {
      if (active) {
        treeCtrl.select($scope);
        $scope.onSelect();
      } else {
        treeCtrl.deselect($scope);
        $scope.onDeselect();
      }
    });
  }
]);

angular.module('ui.tree').directive("keyHandler", function() {
  return function(scope, element, attrs) {
    angular.element(document).bind("keydown keypress", function(event) {
      var moveDown, moveLeft, moveRight, moveUp, _ref;
      if ((_ref = document.activeElement.tagName) === 'TEXTAREA' || _ref === 'INPUT' || _ref === 'SELECT') {
        return;
      }
      scope.test();
      moveDown = function() {
        console.log('down');
      };
      moveUp = function() {
        console.log('up');
      };
      moveRight = function() {
        console.log('right');
      };
      moveLeft = function() {
        console.log('left');
      };
      switch (event.which) {
        case 40:
          return moveDown();
        case 38:
          return moveUp();
        case 39:
          return moveRight();
        case 37:
          return moveLeft();
      }
    });
  };
});

angular.module('ui.tree').directive("uiTree", function() {
  return {
    restrict: "E",
    transclude: true,
    replace: true,
    scope: {
      noDrop: '=?'
    },
    controller: "TreeController",
    templateUrl: function(elem, attrs) {
      var templateType;
      if (attrs.templateUrl) {
        return attrs.templateUrl;
      }
      templateType = attrs.templateType || 'default';
      return 'template/tree/' + templateType + '/tree.html';
    },
    link: function(scope, element, attrs) {}
  };
});

angular.module('ui.tree').directive("uiTreeCollapse", function() {
  return {
    link: function(scope, element, attrs) {
      var collapse, expand;
      collapse = function() {
        element.removeClass('ui-tree-collapse in');
        element.addClass('ui-tree-collapse');
        return element.css({
          height: 0
        });
      };
      expand = function() {
        element.removeClass('ui-tree-collapse');
        element.addClass('ui-tree-collapse in');
        return element.css({
          height: 'auto'
        });
      };
      scope.$watch(attrs.uiTreeCollapse, function(shouldCollapse) {
        if (shouldCollapse) {
          collapse();
        } else {
          expand();
        }
      });
    }
  };
});

angular.module('ui.tree').directive("uiTreeNode", function() {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    require: ['?^^uiTreeNode', '^uiTree'],
    scope: {
      text: '@',
      collapse: '=?',
      selected: '=?',
      disabled: '=?',
      expandIcon: '@',
      collapseIcon: '@',
      emptyIcon: '@',
      onSelect: '&select',
      onDeselect: '&deselect'
    },
    controller: 'TreeNodeController',
    templateUrl: function(elem, attrs) {
      var templateType;
      if (attrs.templateUrl) {
        return attrs.templateUrl;
      }
      templateType = attrs.templateType || 'default';
      return 'template/tree/' + templateType + '/node.html';
    },
    link: function(scope, element, attrs, controllersArr) {
      scope.init(controllersArr);
      scope.collapse = !!scope.collapse;
      scope.$on("$destroy", function() {
        parentCtrl.removeNode(scope);
      });
    }
  };
});
