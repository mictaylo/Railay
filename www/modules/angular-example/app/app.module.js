'use strict';

define(
	[
		'angular',
		'angular-ui-router',
		'../base-url/base-url'
	],
	function (angular) {
		return angular.module('ngExample', ['ui.router', 'baseUrl']);
	}
);
