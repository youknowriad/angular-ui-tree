angular.module("template/tree/node.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tree/node.html",
    "<li class=\"ui-tree-node\" ng-class=\"{}\" ng-transclude></li>\n" +
    "");
}]);

angular.module("template/tree/tree.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tree/tree.html",
    "<div>\n" +
    "  <ul class=\"angular-ui-tree\" ng-transclude></ul>\n" +
    "</div>\n" +
    "");
}]);
