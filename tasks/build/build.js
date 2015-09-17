'use strict';

module.exports = function (gulp, config, $) {

	gulp.task('build-dev', function (callback) {
		var runSequence = require('run-sequence').use(gulp);

		runSequence(
			['del-dist'],
			['copy-src-to-dist', 'copy-bower-to-dist'],
			['wiredep', 'sass', 'babel', 'requirejs-optimize'],
			callback
		);
	});

	gulp.task('build-dist-final', function (callback) {
		var assets = $.useref.assets({searchPath: ['dist']});
		var cssFilter = $.filter(['**/*.css']);
		var jsFilter = $.filter('**/*.js');
		var cache = require('gulp-cached');
		var remember = require('gulp-remember');
		var sourcemaps = require('gulp-sourcemaps');
		return gulp
			.src(config.build.src)
			//.pipe($.print())
			.pipe(assets)
			//.pipe($.print())
			.pipe(sourcemaps.init())
			.pipe(cache('compile-assets'))
			.pipe(cssFilter)
			//.pipe(remember('styles'))
			//.pipe($.print())
			.pipe($.minifyCss())
			.pipe(cssFilter.restore())
			.pipe(jsFilter)
			//.pipe($.print())
			//.pipe(remember('scripts'))
			.pipe($.uglify())
			.pipe(jsFilter.restore())
			.pipe(assets.restore())
			.pipe(remember('compile-assets'))
			//.pipe($.print())
			.pipe($.useref())
			.pipe(sourcemaps.write(config.build.maps))
			.pipe(gulp.dest(config.paths.destination));
	});

	gulp.task('build-dist', function (callback) {

		var runSequence = require('run-sequence').use(gulp);

		runSequence(
			['del-dist'],
			['copy-src-to-dist', 'copy-bower-to-dist'],
			['wiredep', 'sass', 'babel', 'requirejs-optimize'],
			'build-dist-final',
			callback
		);
	});

	gulp.task('build-test', function (callback) {

		var runSequence = require('run-sequence').use(gulp);

		runSequence(
			['build-dev'],
			['test', 'vet'],
			callback
		);
	});

	var watchedFiles = [
		config.paths.www + config.js.sourceFiles,
		config.paths.www + config.swig.sourceFiles
	];
	gulp.task('watch-build-dev', ['build-dev'], function () {
		gulp.watch(config.paths.www + config.sass.sourceFiles, ['sass']);
		return gulp.watch(watchedFiles, ['build-dev']);
	});
	gulp.task('watch-build-test', ['build-test'], function () {
		gulp.watch(config.paths.www + config.sass.sourceFiles, ['sass']);
		return gulp.watch(watchedFiles, ['build-test']);
	});
	gulp.task('watch-build-dist', ['build-dist'], function () {
		gulp.watch(config.paths.www + config.sass.sourceFiles, ['sass']);
		return gulp.watch(watchedFiles, ['build-dist']);
	});

};
