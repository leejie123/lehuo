angular.module('starter.service', [])
.directive('showContent', ['$compile',function($compile) {
	return {
		restrict: 'E',
		scope: true,
		link: function($scope, $element, $attr) {
			var el;
			$attr.$observe('template', function(tpl) {
				el = $compile(tpl)($scope);
				$element.html("");
				$element.append(el);
			})
			console.log($element)
		}
	}
}])

 