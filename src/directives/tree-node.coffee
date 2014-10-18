angular.module('ui.tree').directive "uiTreeNode", ->
  restrict: 'E'
  transclude: true
  replace: true
  require: ['?^uiTreeNode', '^uiTree']
  scope:
    active: '=?'
    onSelect: '&select'
    onDeselect: '&deselect'
  controller: 'TreeNodeController'
  templateUrl: "template/tree/tree.html"
  link: (scope, element, attrs, controllersArr) ->
    treeNodeCtrl = controllersArr[0]
    treeCtrl = controllersArr[1]
    parentCtrl = (if treeNodeCtrl then treeNodeCtrl else treeCtrl)

    parentCtrl.addNode scope
    scope.$on "$destroy", ->
      parentCtrl.removeNode scope
      return

    return
