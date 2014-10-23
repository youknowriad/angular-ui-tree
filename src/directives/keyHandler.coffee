angular.module('ui.tree').directive "keyHandler", ->
  (scope, element, attrs) ->
    angular.element(document).bind "keydown keypress", (event)->
      # Check if is in input
      if document.activeElement.tagName in ['TEXTAREA', 'INPUT', 'SELECT']
        return

      scope.test()

      moveDown = ->
        console.log 'down'
        return

      moveUp = ->
        console.log 'up'
        return

      moveRight = ->
        console.log 'right'
        return

      moveLeft = ->
        console.log 'left'
        return


      switch event.which
        when 40
          return moveDown()
        when 38
          return moveUp()
        when 39
          return moveRight()
        when 37
          return moveLeft()
    return