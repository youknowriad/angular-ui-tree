  angular.module('ui.tree')
  .directive('uiTree',
    ['$document', 'uiTreeConfig', '$parse', '$log',
    function($document, uiTreeConfig) {
    return {
      restrict: 'EA',
      templateUrl: function(tElement, tAttrs) {
        var theme = tAttrs.theme || uiTreeConfig.theme;
        return theme + '/tree.tpl.html';
      },
      replace: true,
      transclude: true,
      require: ['uiTree', '?ngModel'],
      scope: true,

      controller: 'uiTreeCtrl',
      controllerAs: '$tree',

      link: function(scope, element, attrs, ctrls) {
        var $tree = ctrls[0];
        var ngModel = ctrls[1];
        $tree.ngModel = ngModel;
      }
    };
  }]);