'use strict';

define(
	[
		'../app.module',
		'./view1.controller'
	],
	function (app) {

		app.config(route);

		function route ($stateProvider) {

			$stateProvider
				.state('default', {
					url    : '',
					resolve: {
						data: [function () {
						}]
					},
					views  : {
						'main': {
							templateUrl: '::baseUrl-appRoot/app/routes/view1.html',
							controller : 'View1Controller'
						}
					}
				});

		}

		return route;
	}
);
