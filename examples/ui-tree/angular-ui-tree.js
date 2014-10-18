/*! Angular-ui-tree v3.0.0-alpha1
 *  https://github.com/jimliu/angular-ui-tree
 *  Copyright (c) 2014, Jim Liu
 */

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
    require: ['?^uiTreeNode', '^uiTree'],
    scope: {
      active: '=?',
      onSelect: '&select',
      onDeselect: '&deselect'
    },
    controller: 'TreeNodeController',
    templateUrl: "template/tree/tree.html",
    link: function(scope, element, attrs, controllersArr) {
      var parentCtrl, treeCtrl, treeNodeCtrl;
      treeNodeCtrl = controllersArr[0];
      treeCtrl = controllersArr[1];
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
    restrict: "EA",
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

angular.module("template/tree/node.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tree/node.html",
    "<li class=\"ui-tree-node\" ng-class=\"{}\">\n" +
    "  <a ng-click=\"select()\" tab-heading-transclude>{{heading}}</a>\n" +
    "</li>\n" +
    "");
}]);

angular.module("template/tree/tree.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tree/tree.html",
    "<div>\n" +
    "  <ul class=\"angular-ui-tree\" ng-transclude></ul>\n" +
    "</div>\n" +
    "");
}]);
