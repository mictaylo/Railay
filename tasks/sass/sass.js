'use strict';

module.exports = function (gulp, config, $) {
	gulp.task('sass', function (callback) {

		var sass = require('gulp-sass');
		var sourcemaps = require('gulp-sourcemaps');
		var cache = require('gulp-cached');
		var remember = require('gulp-remember');
		var rename = require('gulp-rename');

		return gulp.src(config.paths.www + config.sass.sourceFiles)
			//.pipe($.print())
			.pipe(sourcemaps.init())
			//.pipe(cache('compile-sass'))
			//.pipe($.newer(config.sass.destination))
			.pipe(sass().on('error', sass.logError))
			//.pipe(remember('compile-sass'))
			.pipe($.minifyCss())
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(sourcemaps.write(config.sass.maps))
			.pipe(gulp.dest(config.sass.destination));
	});

};
