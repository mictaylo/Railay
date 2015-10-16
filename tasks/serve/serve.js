'use strict';

module.exports = function (gulp, config, $) {

	gulp.task('serve-dev-start', function (callback) {

		var started = false;

		return $.nodemon({
				script: config.serve.index,
				ext   : 'js',
				ignore: [],
				tasks : [],
				watch : config.serve.watch,
				env: { 'NODE_ENV': 'development' }
			})
			.on('restart', function () {
				console.log('restarted!');
			})
			.on('start', function () {
				if (!started) {
					callback();
					started = true;
				}
			})
			.on('exit', function () {
				process.exit(0);
			});
	});

	gulp.task('serve-dev', function (callback) {

		var runSequence = require('run-sequence').use(gulp);

		return runSequence(
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

		var started = false;

		return $.nodemon({
				script: config.serve.index,
				ext   : 'js',
				ignore: [],
				tasks : [],
				watch : config.serve.watch,
				env: { 'NODE_ENV': 'production' }
			})
			.on('restart', function () {
				console.log('restarted!');
			})
			.on('start', function () {
				if (!started) {
					callback();
					started = true;
				}
			})
			.on('exit', function () {
				process.exit(0);
			});

	});

	gulp.task('serve-dist', function () {

		var runSequence = require('run-sequence').use(gulp);

		runSequence(
			'watch-build-dist',
			'serve-start'
		);
	});

};
