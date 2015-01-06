  angular.module('ui.tree')
  .directive('uiTreeKeyHandler',
    ['$document',
    function($document) {
    return {
      restrict: 'A',
      require: '^uiTree',
      link: function(scope, element, attrs, $tree) {
        $document.bind("keydown keypress", function(e) {
          var tagName = $document[0].activeElement.tagName;
          // @TODO: editable content
          if (tagName === 'TEXTAREA' || tagName === 'INPUT' ||
              tagName === 'SELECT') {
            return;
          }
          switch (e.which) {
            case 13: // enter
              break;
            case 37: // left
              e.preventDefault();
              scope.$apply(function() {
                $tree.collapseSelected();
              });
              break;
            case 38: // up
              e.preventDefault();
              scope.$apply(function() {
                $tree.moveUp();
              });
              break;
            case 39: // right
              e.preventDefault();
              scope.$apply(function() {
                $tree.expandSelected();
              });
              break;
            case 40: // down
              e.preventDefault();
              scope.$apply(function() {
                $tree.moveDown();
              });
              break;
            case 36: // home
              e.preventDefault();
              break;
            case 35: // end
              e.preventDefault();
              break;
            case 46: // delete
              e.preventDefault();
              break;
            default:
              // console.log(e.which);
              break;
          }
        });
      }
    };
  }]);