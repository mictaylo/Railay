'use strict';

/* global inject */

define(
	[
		'angular-mocks',
		'./base-url.module'
	],
	function (angularMocks, ngItem) {

		describe('base-url module', function () {

			beforeEach(module('baseUrl', function ($provide) {
				$provide.value('$window', {
					alert: jasmine.createSpy('alert')
				});
			}));

			it('should alert on $window', inject(function ($window) {
				$window.alert('Test');
				expect($window.alert).toHaveBeenCalledWith('Test');
			}));

		});
	}
);
