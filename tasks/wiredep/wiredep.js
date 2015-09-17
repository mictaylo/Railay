'use strict';

module.exports = function (gulp, config, $) {

	/**
	 * Inject files in a sorted sequence at a specified inject label
	 * @param   {Array} src   glob pattern for source files
	 * @param   {String} label   The label name
	 * @param   {Array} order   glob pattern for sort order of the files
	 * @returns {Stream}   The stream
	 */
	function inject(src, label, order) {
		var options = {read: false};
		if (label) {
			options.name = 'inject:' + label;
		}

		return $.inject(orderSrc(src, order), options);
	}

	/**
	 * Order a stream
	 * @param   {Stream} src   The gulp.src stream
	 * @param   {Array} order Glob array pattern
	 * @returns {Stream} The ordered stream
	 */
	function orderSrc (src, order) {
		return gulp
			.src(src)
			//.pipe($.print())
			.pipe($.if(order, $.order(order)));
	}

	/**
	 * Wire-up the bower dependencies
	 * @return {Stream}
	 */
	gulp.task('wiredep', function() {
		$.util.log('Wiring the bower dependencies into the html');

		var wiredep = require('wiredep').stream;
		var sourcemaps = require('gulp-sourcemaps');

		return gulp
			.src(config.paths.destination + config.swig.sourceFiles)
			//.pipe($.print())
			.pipe(wiredep(config.bower))
			//.pipe(inject(config.paths.sass.destFiles, 'css'))
			//.pipe(inject(config.paths.js.footer, 'js', config.paths.footerOrder))
			.pipe(gulp.dest(config.paths.destination));
	});

	return {
		inject: inject
	};
};
