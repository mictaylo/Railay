'use strict';

/* global inject */

define(
	[
		'angular-mocks',
		'./app.routes'
	],
	function (angularMocks, ngItem) {

		describe('ngExample routes', function () {

			beforeEach(module('ngExample', function ($provide) {
			}));

			it('should handle state-x', inject(function ($window) {
				//expect(false).toBe(true);
			}));

		});
	}
);
