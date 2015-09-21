'use strict';

/* global inject */

define(
	[
		'require',
		'angular',
		'angular-mocks',
		'./base-url.config'
	],
	function (require, angular, angularMocks, ngItem) {

		describe('base-url config', function () {

			var httpProvider;

			beforeEach(module('baseUrl', function ($httpProvider) {

				httpProvider = $httpProvider;

			}));

			it('should have added baseUrlProvider as a request http interceptor', inject(function () {
				expect(httpProvider.interceptors).toContain('baseUrlProvider');
			}));

			it('should replace GET ::baseUrl-appRoot/ with app root path', inject(function ($httpBackend, $http) {
				$httpBackend.expectGET(require.toUrl('../')).respond(200, '');
				$http.get('::baseUrl-appRoot/');
				$httpBackend.flush();
				$httpBackend.verifyNoOutstandingExpectation();
				$httpBackend.verifyNoOutstandingRequest();
			}));

			it('should replace POST ::baseUrl-appRoot/ with  app root path', inject(function ($httpBackend, $http) {
				$httpBackend.expectPOST(require.toUrl('../')).respond(200, '');
				$http.post('::baseUrl-appRoot/', {msg:'hello word!'});
				$httpBackend.flush();
				$httpBackend.verifyNoOutstandingExpectation();
				$httpBackend.verifyNoOutstandingRequest();
			}));

			it('should replace http({}) ::baseUrl-appRoot/ with  app root path', inject(function ($httpBackend, $http) {
				$httpBackend.expectPOST(require.toUrl('../')).respond(200, '');
				$http({
					method: 'POST',
					url: '::baseUrl-appRoot/',
					data: { test: 'test' }
				});
				$httpBackend.flush();
				$httpBackend.verifyNoOutstandingExpectation();
				$httpBackend.verifyNoOutstandingRequest();
			}));

		});
	}
);
