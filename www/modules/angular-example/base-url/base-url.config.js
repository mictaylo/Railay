'use strict';

define(
	[
		'require',
		'angular',
		'./base-url.module'
	],
	function (require, angular, app) {

		app.config(baseUrlConfig);

		baseUrlConfig.$inject = [
			'$provide',
			'$httpProvider'
		];

		function baseUrlConfig ($provide, $httpProvider) {

			var appTemplateRoot = require.toUrl('../');

			$provide.factory('baseUrlProvider', function ($q) {
				return {

					'request': function (config) {

						config.url = config.url.replace(/(\:\:baseUrl-appRoot)[\/?#:]|(\:app_template_root)$/, appTemplateRoot);
						return config;

					}

				};
			});

			$httpProvider.interceptors.push('baseUrlProvider');

		}

		return baseUrlConfig;
	}
);
