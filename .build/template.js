angular.module("template/tree/default/node.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tree/default/node.html",
    "<li class=\"ui-tree-node\" ng-class=\"{}\">\n" +
    "  <div class=\"ui-tree-node-heading\">\n" +
    "    <a class=\"expand-collapse\" ng-click=\"toggle()\">\n" +
    "      <i ng-class=\"expandCollapseIconClass()\"></i>\n" +
    "    </a>\n" +
    "    {{text}}\n" +
    "  </div>\n" +
    "  <ul ui-tree-collapse=\"collapse\" class=\"ui-tree-nodes\" ng-show=\"nodes.length > 0\" ng-transclude>\n" +
    "  </ul>\n" +
    "</li>\n" +
    "");
}]);

angular.module("template/tree/default/tree.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tree/default/tree.html",
    "<div class=\"ui-tree tree-default\" key-handler>\n" +
    "  <ul ng-transclude class=\"ui-tree-nodes\"></ul>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/tree/list/node.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tree/list/node.html",
    "<div class=\"ui-tree-node\" ng-class=\"{}\">\n" +
    "    <div class=\"ui-tree-node-heading\" ng-style=\"{'padding-left': (depth() * 10) + 'px'}\">\n" +
    "        <a class=\"expand-collapse\" ng-click=\"toggle()\">\n" +
    "            <i ng-class=\"expandCollapseIconClass()\"></i>\n" +
    "        </a>\n" +
    "        {{text}}\n" +
    "    </div>\n" +
    "    <div ui-tree-collapse=\"collapse\" class=\"ui-tree-nodes\" ng-show=\"nodes.length > 0\" ng-transclude>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("template/tree/list/tree.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tree/list/tree.html",
    "<div class=\"ui-tree tree-list\" key-handler>\n" +
    "    <div ng-transclude class=\"ui-tree-nodes\"></div>\n" +
    "</div>\n" +
    "");
}]);
