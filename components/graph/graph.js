angular
	.module('component.graph', [])
	.component('graph', {
		template: '<canvas id="{{graph.id}}"></canvas>',
		controller: function ($element, $timeout) {
			var context = this;

			this.id = _.uniqueId("graph-");
			this.size = function ($element) {
				var $el = $element[0];
				return { width: $el.clientWidth, height: $el.clientHeight };
			};

			var size = this.size($element);

			$timeout(function () {
				context.canvas = new fabric.Canvas(context.id, {
					width: size.width,
					height: size.height
				});
			})
		}
	})