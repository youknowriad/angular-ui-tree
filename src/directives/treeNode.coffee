angular.module('ui.tree').directive "uiTreeNode", ->
  restrict: 'E'
  transclude: true
  replace: true
  require: ['?^^uiTreeNode', '^uiTree']
  scope:
    text: '@'
    collapse: '=?'
    selected: '=?'
    disabled: '=?'
    expandIcon: '@'
    collapseIcon: '@'
    emptyIcon:'@'
    onSelect: '&select'
    onDeselect: '&deselect'
  controller: 'TreeNodeController'
  templateUrl: (elem, attrs) ->
    if attrs.templateUrl
      return attrs.templateUrl
    templateType = attrs.templateType || 'default'
    'template/tree/' + templateType + '/node.html'

  link: (scope, element, attrs, controllersArr) ->
    scope.init controllersArr
    scope.collapse = !!scope.collapse

    scope.$on "$destroy", ->
      parentCtrl.removeNode scope
      return

    return
