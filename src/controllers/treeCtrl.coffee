angular.module('ui.tree').controller 'TreeController', [
  "$scope"
  ($scope) ->
    ctrl = this
    nodes = ctrl.nodes = $scope.nodes = []
    selectedNode = null

    ctrl.addNode = addNode = (node) ->
      nodes.push node
      return

    ctrl.removeNode = removeNode = (node) ->
      index = nodes.indexOf(node)
      nodes.splice index, 1
      return

    ctrl.select = (node) ->
      if selectedNode and selectedNode isnt node
        selectedNode.selected = false
      selectedNode = node
      return

    ctrl.deselect = (node) ->
      if selectedNode and selectedNode is node
        selectedNode = null
      return

    destroyed = undefined
    $scope.$on "$destroy", ->
      destroyed = true
      return

    $scope.test = ->
      console.log('test')
      return
]
