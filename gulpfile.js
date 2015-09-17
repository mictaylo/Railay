'use strict';

var config = require('./config')();
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});

require('./tasks/copy/copy.js')(gulp, config, $);
require('./tasks/vet/vet.js')(gulp, config, $);
require('./tasks/test/test.js')(gulp, config, $);
require('./tasks/wiredep/wiredep.js')(gulp, config, $);
require('./tasks/sass/sass.js')(gulp, config, $);
require('./tasks/delete/delete.js')(gulp, config, $);
require('./tasks/babel/babel.js')(gulp, config, $);
require('./tasks/requirejs/requirejs.js')(gulp, config, $);
require('./tasks/build/build.js')(gulp, config, $);
require('./tasks/serve/serve.js')(gulp, config, $);

/**
 * List the available gulp tasks
 */
gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

module.exports = gulp;
