'use strict';

module.exports = function (gulp, config, $) {
	gulp.task('vet', function () {
		var eslint = require('gulp-eslint');

		return gulp.src(config.vet.js.sourceFiles)
			// eslint() attaches the lint output to the eslint property
			// of the file object so it can be used by other modules.
			.pipe(eslint())
			// eslint.format() outputs the lint results to the console.
			// Alternatively use eslint.formatEach() (see Docs).
			.pipe(eslint.format());
			// To have the process exit with an error code (1) on
			// lint error, return the stream and pipe to failOnError last.
			//.pipe(eslint.failOnError());
	});

	var watchedFiles = config.vet.js.sourceFiles;
	gulp.task('watch-vet', ['vet'], function () {
		return gulp.watch(watchedFiles, ['vet']);
	});
};
