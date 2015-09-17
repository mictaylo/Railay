'use strict';

module.exports = function (gulp, config, $) {

	gulp.task('del-dist', function (callback) {
		var del = require('del');

		del(config.paths.destination, function (err, paths) {
			if(paths) {
				console.log('Deleted files/folders:\n', paths.join('\n'));
			}
			callback();
		});
	});

	gulp.task('del-tmp', function (callback) {
		var del = require('del');

		del(config.paths.tmp, function (err, paths) {
			if(paths) {
				console.log('Deleted files/folders:\n', paths.join('\n'));
			}
			callback();
		});

		return gulp;
	});

};
