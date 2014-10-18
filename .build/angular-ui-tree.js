
/**
@ngdoc overview
@name ui.tree

@description
AngularJS version of the tree directive.
 */
angular.module("ui.tree", ['ui.tree.tpls']);

angular.module("ui.tree.tpls", ['template/tree/tree.html', 'template/tree/node.html']);

angular.module('ui.tree').controller('TreeNodeController', [
  "$scope", function($scope) {
    var addNode, ctrl, nodes, removeNode;
    ctrl = this;
    nodes = ctrl.nodes = $scope.nodes = [];
    ctrl.addNode = addNode = function(node) {
      nodes.push(node);
      console.log('tree-node', nodes);
    };
    ctrl.removeNode = removeNode = function(node) {
      var index;
      index = nodes.indexOf(node);
      nodes.splice(index, 1);
    };
  }
]);

angular.module('ui.tree').controller('TreeController', [
  "$scope", function($scope) {
    var addNode, ctrl, destroyed, nodes, removeNode;
    ctrl = this;
    nodes = ctrl.nodes = $scope.nodes = [];
    ctrl.addNode = addNode = function(node) {
      nodes.push(node);
      console.log('tree', nodes);
    };
    ctrl.removeNode = removeNode = function(node) {
      var index;
      index = nodes.indexOf(node);
      nodes.splice(index, 1);
    };
    destroyed = void 0;
    return $scope.$on("$destroy", function() {
      destroyed = true;
    });
  }
]);

angular.module('ui.tree').directive("uiTreeNode", function() {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    require: ['?^^uiTreeNode', '^uiTree'],
    scope: {
      text: '@',
      active: '=?',
      onSelect: '&select',
      onDeselect: '&deselect'
    },
    controller: 'TreeNodeController',
    templateUrl: "template/tree/node.html",
    link: function(scope, element, attrs, controllersArr) {
      var parentCtrl, treeCtrl, treeNodeCtrl;
      treeNodeCtrl = controllersArr[0];
      treeCtrl = controllersArr[1];
      console.log('treeNodeCtrl', treeNodeCtrl);
      parentCtrl = (treeNodeCtrl ? treeNodeCtrl : treeCtrl);
      parentCtrl.addNode(scope);
      scope.$on("$destroy", function() {
        parentCtrl.removeNode(scope);
      });
    }
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
    templateUrl: "template/tree/tree.html",
    link: function(scope, element, attrs) {}
  };
});
