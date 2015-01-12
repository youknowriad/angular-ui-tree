  angular.module('ui.tree')
  .directive('uiTreeNode', ['uiTreeConfig', 'uiTreeMinErr', '$parse', '$compile', '$http', '$templateCache',
    function(uiTreeConfig, uiTreeMinErr, $parse, $compile, $http, $templateCache) {
    return {
      restrict: 'EA',
      require: ['?^^uiTreeNode', '^uiTree', 'ngModel'],
      replace: true,
      scope: true,
      controller: 'uiTreeNodeCtrl',
      controllerAs: '$treeNode',

      link: function(scope, element, attrs, ctrls) {
        scope.init(ctrls, element);

        scope.onSelectCallback = $parse(attrs.onSelect);

        var $tree = ctrls[1],
            theme = $tree.theme || uiTreeConfig.theme;
        var templateUrl = attrs.templateUrl || theme + '/tree-node.tpl.html';

        $http.get(templateUrl, {
          cache: $templateCache
        })
        .then(function(response) {
          element.html(response.data);
          if (angular.isArray(scope.$node.nodes)) {
            var html = "<ui-tree-nodes nodes='$node.nodes' parent='$node'></ui-tree-nodes>";
            element.querySelectorAll('.ui-tree-nodes-placeholder').replaceWith(html);
          }
          $compile(element.contents())(scope);
        });
      }
    };
  }]);