/*!
 * ui-tree
 * http://github.com/jimliu/ui-tree
 * Version: 3.0.0 - 2015-01-06T14:21:56.271Z
 * License: MIT
 */


(function(){
	"use strict";

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
      scope.$tree = $tree;
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
  angular.module('ui.tree')
  .directive('uiTreeKeyHandler',
    ['$document',
    function($document) {
    return {
      restrict: 'A',
      require: '^uiTree',
      link: function(scope, element, attrs, $tree) {
        $document.bind("keydown keypress", function(e) {
          var tagName = $document[0].activeElement.tagName;
          // @TODO: editable content
          if (tagName === 'TEXTAREA' || tagName === 'INPUT' ||
              tagName === 'SELECT') {
            return;
          }
          switch (e.which) {
            case 13: // enter
              break;
            case 37: // left
              e.preventDefault();
              scope.$apply(function() {
                $tree.collapseSelected();
              });
              break;
            case 38: // up
              e.preventDefault();
              scope.$apply(function() {
                $tree.moveUp();
              });
              break;
            case 39: // right
              e.preventDefault();
              scope.$apply(function() {
                $tree.expandSelected();
              });
              break;
            case 40: // down
              e.preventDefault();
              scope.$apply(function() {
                $tree.moveDown();
              });
              break;
            case 36: // home
              e.preventDefault();
              break;
            case 35: // end
              e.preventDefault();
              break;
            case 46: // delete
              e.preventDefault();
              break;
            default:
              // console.log(e.which);
              break;
          }
        });
      }
    };
  }]);
  angular.module('ui.tree')
  .directive('uiTree',
    ['$document', 'uiTreeConfig', '$parse', '$log',
    function($document, uiTreeConfig) {
    return {
      restrict: 'EA',
      templateUrl: function(tElement, tAttrs) {
        var theme = tAttrs.theme || uiTreeConfig.theme;
        return theme + '/tree.tpl.html';
      },
      replace: true,
      transclude: true,
      require: ['uiTree', '?ngModel'],
      scope: true,

      controller: 'uiTreeCtrl',
      controllerAs: '$tree',

      link: function(scope, element, attrs, ctrls) {
        var $tree = ctrls[0];
        var ngModel = ctrls[1];
        $tree.ngModel = ngModel;

        attrs.$observe('wholerow', function() {
          $tree.wholerow = attrs.wholerow !== undefined ? scope.$eval(attrs.wholerow) : false;
        });
      }
    };
  }]);
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
  angular.module('ui.tree')
  .directive('uiTreeNodeHeader', [function() {
    return {
      restrict: 'A',
      require: '^uiTreeNode',
      link: function(scope, element, attrs) {
        var val = attrs.uiTreeNodeHeader,
            wholerow = val == 'wholerow';

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
            if (wholerow) {
              element.addClass('ui-tree-node-wholerow-selected');
            } else {
              element.addClass('ui-tree-node-selected');
            }
          } else {
            element.removeClass('ui-tree-node-selected');
            element.removeClass('ui-tree-node-wholerow-selected');
          }
        });

        scope.$watch('hovered', function(hovered) {
          if (hovered) {
            if (wholerow) {
              element.addClass('ui-tree-node-wholerow-hover');
            } else {
              element.addClass('ui-tree-node-header-hover');
            }
          } else {
            element.removeClass('ui-tree-node-header-hover');
            element.removeClass('ui-tree-node-wholerow-hover');
          }
        });

      }
    };
  }]);
})();

angular.module("ui.tree").run(["$templateCache", function($templateCache) {$templateCache.put("default/tree-node.tpl.html","<li class=\"ui-tree-node\" ng-class=\"{}\"><div ng-if=\"$tree.wholerow\" class=\"ui-tree-node-wholerow\" ui-tree-node-header=\"wholerow\">&nbsp;</div><a class=\"ui-tree-link\" tabindex=\"-1\" ng-click=\"toggle()\"><i ng-class=\"{\'fa-caret-right\': collapsed, \'fa-caret-down\': !collapsed}\" class=\"ui-tree-icon fa\"></i></a><a class=\"ui-tree-link ui-tree-node-header\" href=\"javascript:void(0)\" tabindex=\"-1\" ui-tree-node-header=\"\"><i class=\"fa fa-folder\" ng-class=\"{\'fa-folder\': collapsed, \'fa-folder-open\': !collapsed}\"></i> {{text}}</a><ul class=\"ui-tree-nodes\" ng-show=\"nodes.length > 0 && !collapsed\" ng-transclude=\"\"></ul></li>");
$templateCache.put("default/tree.tpl.html","<div class=\"ui-tree tree-default\" ng-class=\"{\'ui-tree-wholerow\': $tree.wholerow}\" ui-tree-key-handler=\"\"><ul ng-transclude=\"\" class=\"ui-tree-nodes\"></ul></div>");}]);