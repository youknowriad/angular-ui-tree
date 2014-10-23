angular.module('ui.tree').directive "uiTreeCollapse", ->
  link: (scope, element, attrs) ->
    collapse = () ->
      element.removeClass 'ui-tree-collapse in'
      element.addClass 'ui-tree-collapse'
      element.css height: 0
    expand = () ->
      element.removeClass 'ui-tree-collapse'
      element.addClass 'ui-tree-collapse in'
      element.css height: 'auto'

    scope.$watch attrs.uiTreeCollapse, (shouldCollapse)->
      if shouldCollapse
        collapse()
        return
      else
        expand()
        return
    return

