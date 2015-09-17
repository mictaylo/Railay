'use strict';

module.exports = function (gulp, config, $) {

	var requirejsOptimize = require('gulp-requirejs-optimize');
	var sourcemaps = require('gulp-sourcemaps');

	gulp.task('requirejs-optimize', function () {
		return gulp.src(config.paths.destination + config.amd.main)
			.pipe(sourcemaps.init())
			.pipe(requirejsOptimize({
				baseUrl: config.paths.destination + config.amd.baseUrl
			}))
			.pipe(sourcemaps.write(config.amd.maps))
			.pipe(gulp.dest(config.paths.destination + config.amd.baseUrl));
	});

};
