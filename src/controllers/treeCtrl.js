  /*
  Controller for ui-tree
  */
  angular.module('ui.tree')
  .controller('uiTreeCtrl', ['$scope', '$timeout',
    function($scope, $timeout) {

    var ctrl = this,
        destroyed,
        nodes = ctrl.nodes = $scope.nodes = [];


    ctrl.selected = undefined;
    ctrl.multiple = false;
    ctrl.wholerow = false;
    ctrl.clickTriggeredSelect = false;

    ctrl.addNode = function(node) {
      nodes.push(node);
    };

    ctrl.removeNode = function(node) {
      var index = nodes.indexOf(node);
      nodes.splice(index, 1);
    };

    $scope.$on('$destroy', function() {
      destroyed = true;
    });

    ctrl.isEmpty = function() {
      return angular.isUndefined(ctrl.selected) || ctrl.selected === null || ctrl.selected === '';
    };

    // When the user selects a node
    ctrl.select = function(node, $event) {
      if (!ctrl.nodes || !ctrl.nodes.length)
        return;

      if(ctrl.multiple) {
        if (!ctrl.selected) {
          ctrl.selected = [];
        }
        ctrl.selected.push(node);
      } else {
        if (ctrl.selected) { // unselect previous selected node
          ctrl.selected.unselect();
        }
        ctrl.selected = node;
      }

      node.select();

      $timeout(function() {
        if (ctrl.onSelectCallback) {
          ctrl.onSelectCallback($scope, {
            $node: node,
            $model: null //@TODO: get model data from node
          });
        }
      });

      if ($event && $event.type === 'click') {
        ctrl.clickTriggeredSelect = true;
      }
    };

    ctrl.expandSelected = function() {
      if (!ctrl.multiple) {
        if (ctrl.selected) {
          ctrl.selected.expand();
        }
      }
    };

    ctrl.collapseSelected = function() {
      if (!ctrl.multiple) {
        if (ctrl.selected) {
          ctrl.selected.collapse();
        }
      }
    };

    ctrl.moveUp = function() {
      if (!ctrl.multiple) {
        if (ctrl.selected) {
          var prev = ctrl.selected.prevExpandedNode();
          if (prev) {
            ctrl.select(prev);
          }
        }
      }
    };

    ctrl.moveDown = function() {
      if (!ctrl.multiple) {
        if (ctrl.selected) {
          var next = ctrl.selected.nextExpandedNode();
          if (next) {
            ctrl.select(next);
          }
        }
      }
    };

  }]);