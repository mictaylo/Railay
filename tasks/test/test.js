'use strict';

var Server = require('karma').Server;

module.exports = function (gulp, config, $) {

	/**
	 * Run specs once and exit
	 * To start servers and run midway specs as well:
	 *    gulp test --startServers
	 * @return {Stream}
	 */
	gulp.task('test', function (done) {
		startTests(true, function (msg) {
			done(msg);
			//process.exit();
		});
	});

	/**
	 * Run specs and wait.
	 * Watch for file changes and re-run tests on each change
	 * To start servers and run midway specs as well:
	 *    gulp autotest --startServers
	 */
	gulp.task('autotest', function (done) {
		startTests(false, function (msg) {
			done(msg);
		});
	});

	/**
	 * Start the tests using karma.
	 * @param  {boolean} singleRun - True means run once and end (CI), or keep running (dev)
	 * @param  {Function} done - Callback to fire when karma is done
	 * @return {undefined}
	 */
	function startTests (singleRun, done) {
		var server = new Server({
			configFile: config.karma.config,
			singleRun : !!singleRun
		}, karmaCompleted);

		server.start();

		////////////////

		function karmaCompleted (karmaResult) {
			log('Karma completed');

			if (karmaResult === 1) {
				done('karma: tests failed');
			} else {
				done();
			}
		}
	}

};
