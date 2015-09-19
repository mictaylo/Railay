'use strict';

/* global requirejs */
requirejs.config({
	shim: {
		jquery: {
			deps: [

			],
			exports: 'jQuery'
		},
		angular: {
			exports: 'angular'
		},
		'angular-ui-router': {
			deps: [
				'angular'
			]
		},
		'angular-mocks': {
			deps: [
				'angular'
			],
			exports: 'angularMocks'
		}
	},
	paths: {
		bower: '../bower_components',
		jquery: '../bower_components/jquery/dist/jquery',
		requirejs: '../bower_components/requirejs/require',
		angular: '../bower_components/angular/angular',
		'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router',
		'angular-mocks': '../bower_components/angular-mocks/angular-mocks'
	},
	packages: [

	]
});
