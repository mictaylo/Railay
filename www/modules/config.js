'use strict';

/* global requirejs */
requirejs.config({
	shim: {
		'jquery': {
			deps: [],
			exports: 'jQuery'
		}
	},
	paths: {
		bower: '../bower_components',
		jquery: '../bower_components/jquery/dist/jquery',
		requirejs: '../bower_components/requirejs/require'
	},
	packages: [

	]
});
