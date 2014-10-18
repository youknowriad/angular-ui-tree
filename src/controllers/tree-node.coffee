angular.module('ui.tree').controller 'TreeNodeController', [
  "$scope"

  ($scope) ->
    ctrl = this
    nodes = ctrl.nodes = $scope.nodes = []

    ctrl.addNode = addNode = (node) ->
      nodes.push node
      console.log 'tree-node', nodes
      return

    ctrl.removeNode = removeNode = (node) ->
      index = nodes.indexOf(node)
      nodes.splice index, 1
      return

    return
]
