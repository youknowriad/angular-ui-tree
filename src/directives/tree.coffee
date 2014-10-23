angular.module('ui.tree').directive "uiTree", ->
  restrict: "E"
  transclude: true
  replace: true
  scope:
    noDrop: '=?'

  controller: "TreeController"
  templateUrl: (elem, attrs) ->
    if attrs.templateUrl
      return attrs.templateUrl
    templateType = attrs.templateType || 'default'
    'template/tree/' + templateType + '/tree.html'

  link: (scope, element, attrs) ->
    return
