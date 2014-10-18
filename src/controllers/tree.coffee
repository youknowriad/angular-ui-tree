angular.module('ui.tree').controller 'TreeController', [
  "$scope"
  ($scope) ->
    ctrl = this
    nodes = ctrl.nodes = $scope.nodes = []

    ctrl.addNode = addNode = (node) ->
      nodes.push node
      console.log 'tree', nodes
      return

    ctrl.removeNode = removeNode = (node) ->
      index = nodes.indexOf(node)
      nodes.splice index, 1
      return

    destroyed = undefined
    $scope.$on "$destroy", ->
      destroyed = true
      return

]
