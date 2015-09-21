'use strict';

define(
	[
		'../app.module',
		'./state-x/state-x.controller'
	],
	function (app) {

		app.config(route);

		function route ($stateProvider) {

			$stateProvider
				.state('state-x', {
					url  : '',
					resolve: {
						data: [function(){}]
					},
					views: {
						'main': {
							templateUrl: '::baseUrl-appRoot/app/routes/state-x/state-x.html',
							controller : 'StateXController'
						}
					}
				});

		}

		return route;
	}
);
