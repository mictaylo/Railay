'use strict';

define(
	[
		'../app.module',
		'./state-x/state-x.controller'
	],
	function (app) {
		app.config(function ($stateProvider) {
			$stateProvider
				.state('state-x', {
					url  : '',
					views: {
						'main': {
							templateUrl: ':app_template_root/app/routes/state-x/state-x.html',
							controller : 'StateXController'
						}
					}
				});

		});
	}
);
