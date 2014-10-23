###*
@ngdoc overview
@name ui.tree

@description
AngularJS version of the tree directive.
###

angular.module "ui.tree", ['ui.tree.tpls']
angular.module "ui.tree.tpls", [
  'template/tree/default/tree.html'
  'template/tree/default/node.html'
  'template/tree/list/tree.html'
  'template/tree/list/node.html'
]