angular.module('ui.tree').directive "uiTree", ->
  restrict: "E"
  transclude: true
  replace: true
  scope:
    noDrop: '=?'

  controller: "TreeController"
  templateUrl: "template/tree/tree.html"
  link: (scope, element, attrs) ->
    return
