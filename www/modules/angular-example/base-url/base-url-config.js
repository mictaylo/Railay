'use strict';

define(['require', 'angular', './base-url-module'], function (require, angular, app) {
	app.config(function ($httpProvider) {
		$httpProvider.interceptors.push(function ($q, $rootElement) {
			var appTemplateRoot = require.toUrl('../');
			return {
				'request': function (config) {
					config.url = config.url.replace(/(\:app_template_root)[\/?#:]|(\:app_template_root)$/, appTemplateRoot);
					return config || $q.when(config);

				}

			};
		});
	});
});
