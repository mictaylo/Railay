'use strict';
//
//// Requirejs Configuration Options
//require.config({
//	// to set the default folder
//	baseUrl: 'src/www',
//	// paths: maps ids with paths (no extension)
//	paths  : {
//		'jasmine'     : ['../../tests/lib/jasmine'],
//		'jasmine-html': ['../../tests/lib/jasmine-html'],
//		'jasmine-boot': ['../../tests/lib/boot']
//	},
//	// shim: makes external libraries compatible with requirejs (AMD)
//	shim   : {
//		'jasmine-html': {
//			deps: ['jasmine']
//		},
//		'jasmine-boot': {
//			deps: ['jasmine', 'jasmine-html']
//		}
//	}
//});
//
//require(['jasmine-boot'], function () {
//	console.info('qwe');
//	require(['my-library.specs'], function () {
//		// trigger Jasmine
//		window.onload();
//	});
//});

var tests = [];
for (var file in window.__karma__.files) {
	//console.info(file);
	if (window.__karma__.files.hasOwnProperty(file)) {
		if (/spec\.js$/.test(file)) {
			file = file.replace(/^\/__karma__\/base\/dist\/modules\//, '').replace(/\.js$/, '');
			tests.push(file);
		}
	}
}
//console.info(tests);

requirejs.config({
	// Karma serves files from '/base'
	baseUrl: '/base/dist/modules',

	// ask Require.js to load these files (all our tests)
	deps: [].concat(
		tests,
		'main'
	),

	// start test run, once Require.js is done
	callback: window.__karma__.start
});
