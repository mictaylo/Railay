'use strict';

var tests = [];
for (var file in window.__karma__.files) {
	//console.info(file);
	if (window.__karma__.files.hasOwnProperty(file)) {
		if (/spec\.js$/.test(file)) {
			file = file.replace(/^\/base\/dist\/modules\//, '').replace(/\.js$/, '');
			tests.push(file);
		}
	}
}
//console.info(tests);

requirejs.config({
	// Karma serves files from '/base'
	baseUrl: '/base/dist/modules'
});

requirejs(['config'], function(){
	requirejs(tests, function(){
		window.__karma__.start();
	});
});
