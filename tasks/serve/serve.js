'use strict';

module.exports = function (gulp, config, $) {

	gulp.task('serve-dev-start', function (callback) {

		$.nodemon({
			script: config.serve.index,
			ext   : 'js',
			ignore: [],
			tasks : [],
			watch : config.serve.watch,
			env: { 'NODE_ENV': 'development' }
		})
		.on('restart', function () {
			console.log('restarted!');
		});

		callback();
	});

	gulp.task('serve-dev', function (callback) {

		var runSequence = require('run-sequence').use(gulp);

		runSequence(
			'watch-build-dev',
			'serve-dev-start',
			callback
		);
	});

	gulp.task('serve-test', function (callback) {

		var runSequence = require('run-sequence').use(gulp);

		runSequence(
			['watch-build-test'],
			['serve-dev-start'],
			callback
		);
	});

	gulp.task('serve-start', function (callback) {

		$.nodemon({
			script: config.serve.index,
			ext   : 'js',
			ignore: [],
			tasks : [],
			watch : config.serve.watch,
			env: { 'NODE_ENV': 'production' }
		})
		.on('restart', function () {
			console.log('restarted!');
		});

		callback();
	});

	gulp.task('serve-dist', function () {

		var runSequence = require('run-sequence').use(gulp);

		runSequence(
			'watch-build-dist',
			'serve-start'
		);
	});

};
