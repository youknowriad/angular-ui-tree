  angular.module('ui.tree')
  .directive('uiTree',
    ['$document', 'uiTreeConfig', 'uiTreeMinErr', '$parse', '$log',
    function($document, uiTreeConfig, uiTreeMinErr) {
    return {
      restrict: 'EA',
      templateUrl: function(tElement, tAttrs) {
        var theme = tAttrs.theme || uiTreeConfig.theme;
        return theme + '/tree.tpl.html';
      },
      replace: true,
      require: ['uiTree', 'ngModel'],
      scope: true,

      controller: 'uiTreeCtrl',
      controllerAs: '$tree',

      link: function(scope, element, attrs, ctrls) {
        var $tree = ctrls[0];
        var ngModel = ctrls[1];
        $tree.ngModel = ngModel;

        ngModel.$render = function() {
          // Make sure that model value is array
          if(!angular.isArray(ngModel.$viewValue)){
            throw uiTreeMinErr('treeModel', "Expected model value to be array but got '{0}'", ngModel.$viewValue);
          }
          $tree.$nodes = ngModel.$viewValue;
        };

        attrs.$observe('wholerow', function() {
          $tree.wholerow = attrs.wholerow !== undefined ? scope.$eval(attrs.wholerow) : false;
        });
      }
    };
  }]);