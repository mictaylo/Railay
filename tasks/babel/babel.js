'use strict';

module.exports = function (gulp, config, $) {

	var sourcemaps = require('gulp-sourcemaps');
	var babel = require('gulp-babel');

	gulp.task('babel', function () {
		return gulp.src(config.paths.destination + config.es6.sourceFiles)
			.pipe(sourcemaps.init())
			.pipe(babel())
			.pipe(sourcemaps.write(config.es6.maps))
			.pipe(gulp.dest(config.es6.destination));
	});

};
