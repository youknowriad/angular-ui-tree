  angular.module('ui.tree')
  .controller('uiTreeNodeCtrl', ['$scope', '$log',
    function($scope) {

    var ctrl = this,
        destroyed, $parentNode, $parent, $tree,
        scope = ctrl.scope = $scope,
        nodes = ctrl.nodes = $scope.nodes = [];

    scope.selected = false;
    scope.hovered = false;

    $scope.init = function (ctrls) {
      scope.$parentNode = $parentNode = ctrls[0];
      $tree = ctrls[1];
      $parent = $parentNode ? $parentNode : $tree;
      $parent.addNode(scope);
    };

    ctrl.addNode = function(node) {
      nodes.push(node);
    };

    ctrl.removeNode = function(node) {
      var index = nodes.indexOf(node);
      nodes.splice(index, 1);
    };

    $scope.toggle = function() {
      $scope.collapsed = !$scope.collapsed;
    };

    $scope.expand = function() {
      $scope.collapsed = false;
    };

    $scope.collapse = function() {
      $scope.collapsed = true;
    };

    $scope.index = function() {
      return $parent.nodes.indexOf($scope);
    };

    $scope.prev = function() {
      var i = $scope.index();
      if (i > 0) {
        return $parent.nodes[i - 1];
      }
      return null;
    };

    $scope.next = function() {
      var i = $scope.index();
      if (i < $parent.nodes.length - 1) {
        return $parent.nodes[i + 1];
      }
      return null;
    };

    $scope.prevExpandedNode = function() {
      var prev = $scope.prev();
      if (!prev) {
        return $parentNode ? $parentNode.scope : null;
      }
      return prev.lastExpanedNode();
    };

    $scope.lastExpanedNode = function() {
      if ($scope.collapsed || nodes.length === 0) {
        return $scope;
      }
      var last = nodes[nodes.length - 1];
      return last.lastExpanedNode();
    };

    $scope.nextExpandedNode = function() {
      if (!$scope.collapsed && nodes.length > 0) {
        return nodes[0];
      }
      var next = $scope.next();
      if (next) {
        if (next.collapsed || next.nodes.length === 0) {
          return next;
        }
        return next.nodes[0];
      } else {
        var parent = $scope.$parentNode ? $scope.$parentNode.scope : null;
        while (parent && !next) {
          next = parent.next();
          parent = parent.$parentNode ? parent.$parentNode.scope : null;
        }
        return next;
      }
    };

    $scope.depth = function() {
      if ($parentNode) {
        return $parentNode.scope.depth() + 1;
      }
      return 1;
    };

    $scope.select = function() {
      if (!$scope.disabled && !$scope.selected) {
        $scope.selected = true;
      }
    };

    $scope.unselect = function() {
      if (!$scope.disabled && $scope.selected) {
        $scope.selected = false;
      }
    };

    $scope.hover = function() {
      if (!$scope.hovered && !$scope.selected &&
          !$scope.disabled) {
        $scope.hovered = true;
      }
    };

    $scope.unhover = function() {
      if ($scope.hovered) {
        $scope.hovered = false;
      }
    };

    $scope.headerClick = function($event) {
      $event.preventDefault();
      $scope.$apply(function() {
        $tree.select($scope, $event);
      });
    };

    $scope.headerHover = function($event) {
      $event.stopImmediatePropagation();
      $event.preventDefault();
      $scope.$apply(function() {
        $scope.hover();
      });
    };

    $scope.headerUnhover = function($event) {
      $event.stopImmediatePropagation();
      $event.preventDefault();
      $scope.$apply(function() {
        $scope.unhover();
      });
    };

    $scope.$on('$destroy', function() {
      destroyed = true;
      $parent.removeNode(scope);
    });
  }]);