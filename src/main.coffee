###*
@ngdoc overview
@name ui.tree

@description
AngularJS version of the tree directive.
###

angular.module "ui.tree", ['ui.tree.tpls']
angular.module "ui.tree.tpls", ['template/tree/tree.html', 'template/tree/node.html']