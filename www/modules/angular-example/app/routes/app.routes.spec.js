'use strict';

/* global inject */

define(
	[
		'require',
		'angular-mocks',
		'./app.routes'
	],
	function (require, angularMocks, ngItem) {

		describe('ngExample routes', function () {

			var state = 'default';

			beforeEach(module('ngExample', function () {}));

			it('should handle default state', inject(function ($rootScope, $state, $injector, $templateCache) {

				$templateCache.put(require.toUrl('../') + 'routes/view1.html', '');

				expect($state.href(state, {})).toEqual('#');

				$state.go('default');
				$rootScope.$digest();
				expect($state.current.name).toBe(state);

			}));

		});
	}
);
