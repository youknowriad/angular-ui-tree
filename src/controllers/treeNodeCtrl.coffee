angular.module('ui.tree').controller 'TreeNodeController', [
  "$scope"

  ($scope) ->
    ctrl = this
    nodes = ctrl.nodes = $scope.nodes = []
    scope = ctrl.scope = $scope
    parentTreeNodeCtrl = parentCtrl = treeCtrl = null


    $scope.init = (controllersArr) ->
      parentTreeNodeCtrl = controllersArr[0]
      treeCtrl = controllersArr[1]
      parentCtrl = (if parentTreeNodeCtrl then parentTreeNodeCtrl else treeCtrl)
      parentCtrl.addNode scope


    ctrl.addNode = addNode = (node) ->
      nodes.push node
      return

    ctrl.removeNode = removeNode = (node) ->
      index = nodes.indexOf(node)
      nodes.splice index, 1
      return

    $scope.toggle = ()->
      $scope.collapse = !$scope.collapse

    $scope.expandIconClass = ()->
      if $scope.expandIcon
        return $scope.expandIcon
      if parentTreeNodeCtrl
        return parentTreeNodeCtrl.scope.expandIconClass()
      'glyphicon glyphicon-plus'

    $scope.collapesIconClass = ()->
      if $scope.collapseIcon
        return $scope.collapseIcon
      if parentTreeNodeCtrl
        return  parentTreeNodeCtrl.scope.collapesIconClass()
      'glyphicon glyphicon-minus'

    $scope.expandCollapseIconClass = ()->
      if nodes.length == 0
        return $scope.emptyIcon || 'glyphicon'
      if $scope.collapse
        return $scope.expandIconClass()
      $scope.collapesIconClass()


    $scope.depth = ()->
      if parentTreeNodeCtrl
        return parentTreeNodeCtrl.scope.depth() + 1
      1

    $scope.select = ->
      if not $scope.disabled
        $scope.selected = true
      return

    $scope.$watch 'selected', (active) ->
      if active
        treeCtrl.select $scope
        $scope.onSelect()
      else
        treeCtrl.deselect $scope
        $scope.onDeselect()
      return

    return
]
