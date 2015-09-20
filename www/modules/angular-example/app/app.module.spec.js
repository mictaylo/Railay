'use strict';

/* global inject */

define(
	[
		'angular-mocks',
		'./app.module'
	],
	function (angularMocks, ngItem) {

		describe('ngExample module', function () {

			beforeEach(module('ngExample', function ($provide) {
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
