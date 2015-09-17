'use strict';

module.exports = function (gulp, config, $) {
	gulp.task('copy-src-to-tmp', function () {
		return gulp.src(config.paths.www + '**/*')
			.pipe(gulp.dest(config.paths.tmp));
	});
	gulp.task('copy-src-to-dist', function () {
		return gulp.src(config.paths.www + '**/*')
			.pipe(gulp.dest(config.paths.destination));
	});
	gulp.task('copy-tmp-to-dist', function () {
		return gulp.src(config.paths.tmp + '**/*')
			//.pipe($.print())
			.pipe(gulp.dest(config.paths.destination));
	});
	gulp.task('copy-bower-to-dist', function () {
		return gulp.src(config.bower.directory + '**/*')
			//.pipe($.print())
			.pipe(gulp.dest(config.paths.destination + '/bower_components'));
	});
	gulp.task('copy-wwwnode-to-dist', function () {
		return gulp.src(config.paths.www + config.node.sourceFiles)
			//.pipe($.print())
			.pipe(gulp.dest(config.paths.destination));
	});
};
