'use strict';

/* global inject */

define(
	[
		'angular',
		'angular-mocks',
		'./view1.controller'
	],
	function (angular, angularMocks, ngItem) {

		describe('default sate controller', function () {

			beforeEach(module('ngExample'));

			it('should contain $scope.controllerHasInitialized', inject(function ($controller) {

				var scope = {};

				$controller('View1Controller', {$scope: scope});

				expect(scope.controllerHasInitialized).toBe(true);
			}));

		});
	}
);
