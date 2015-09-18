'use strict';

define([
	'angular',
	'./app/app.module',
	'./app/routes/app.routes'
], function (angular, app) {
	return {
		run: function (element) {
			angular.element(document).ready(function () {
				angular.bootstrap(element, ['ngExample']);
			});
		}
	};
});
