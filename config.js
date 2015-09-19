'use strict';

module.exports = function (environment) {

	var wiredep = require('wiredep');
	var base    = __dirname + '/';

	var config = {};

	config.paths = {
		base: base,
		www: base + 'www/',
		destination: base + 'dist/',
		server: base + 'server/',
		report: base + 'reports/',
		webIndex: 'index.swig',
		maps: '.'
	};

	config.amd = {
		bowerAMD: ['requirejs'],
		main: 'modules/main.js',
		baseUrl: 'modules',
		maps: config.paths.maps,
		destination: config.paths.destination
	};

	config.bower = {
		bowerJson : require(base + 'bower.json'),
		directory : base + 'bower_components/',
		ignorePath: '..',
		exclude: [].concat(
			config.amd.bowerAMD
		)
	};

	config.js = {
		sourceFiles: '**/*.js'
	};

	config.es6 = {
		sourceFiles: '**/*.es6*.js',
		maps: config.paths.maps,
		destination: config.paths.destination
	};

	config.node = {
		sourceFiles: '**/*.node.js'
	};

	config.sass = {
		sourceFiles: '**/*.scss',
		maps: config.paths.maps,
		destination: config.paths.destination
	};

	config.serve = {
		index: config.paths.server + 'server.js',
		watch: config.paths.server
	};

	config.swig = {
		sourceFiles: '**/*.swig'
	};

	config.build = {
		src: config.paths.destination + config.swig.sourceFiles,
		maps: config.paths.maps
	};

	config.vet = {
		js: {
			sourceFiles: [
				config.paths.www + '**/*.js'
				//, config.paths.base + 'tasks/**/*.js',
				//, config.paths.server + '**/*.js'
			]
		}
	};

	switch (environment) {
		case 'production':
			config.server = {
				port    : 3000,
				www_root: 'dist'
			};
			break;
		default:
			config.server = {
				port    : 3000,
				www_root: 'dist'
			};
			break;
	}

	/**
	 * karma settings
	 */
	config.karma = {
		config: base + 'karma.conf.js',
		exclude: [].concat(
			//config.paths.destination + '**/*.es6*.js'
		),
		sourceFiles: [].concat(
			{pattern: config.bower.directory + '**/*.js', included: false},
			config.paths.destination + '!(bower_components|modules)/**/!(*.spec)+(.js)',
			{pattern: config.paths.destination + 'modules/**/*.js', included: false},
			base + 'karma.require.js'
		),
		coverageFiles: config.paths.destination + '!(bower_components)/**/!(*.spec)+(.js)'
	};
	config.karma.options = getKarmaOptions();

	return config;

	////////////////

	function getKarmaOptions () {
		var options = {
			files: config.karma.sourceFiles,
			exclude: config.karma.exclude,
			coverage: {
				dir: config.paths.report + 'coverage',
				reporters: [
					{ type: 'html', subdir: 'report-html' },
					{ type: 'text', subdir: '.', file: 'text.txt' },
					{ type: 'text-summary' }
				]
			},
			osxReporter: {
				notificationMode: 'failChange'
			},
			preprocessors: {}
		};
		options.preprocessors[config.karma.coverageFiles] = ['coverage'];
		return options;
	}
};
