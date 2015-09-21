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

			var myServiceMock,
				state = 'state-x';

			beforeEach(module('ngExample', function () {}));

			it('should handle state-x', inject(function ($rootScope, $state, $injector, $templateCache) {

				$templateCache.put(require.toUrl('../') + 'routes/state-x/state-x.html', '');

				expect($state.href(state, {})).toEqual('#');

				$state.go('state-x');
				$rootScope.$digest();
				expect($state.current.name).toBe(state);

			}));

		});
	}
);
