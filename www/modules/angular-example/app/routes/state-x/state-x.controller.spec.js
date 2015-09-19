'use strict';

/* global inject */

define(
	[
		'angular',
		'angular-mocks',
		'./state-x.controller'
	],
	function (angular, angularMocks, ngItem) {

		describe('state-x Controller', function () {

			beforeEach(module('ngExample'));

			it('should contain $scope.controllerHasInitialized', inject(function ($controller) {

				var scope = {};

				$controller('StateXController', {$scope: scope});

				expect(scope.controllerHasInitialized).toBe(true);
			}));

		});
	}
);
