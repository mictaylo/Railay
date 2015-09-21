'use strict';

define(['angular', '../app.module'], function (angular, app) {

	app.controller('View1Controller', stateXController);

	var scopeDefaults = {
		controllerHasInitialized: true
	};

	stateXController.$inject = [
		'$scope'
	];

	function stateXController ($scope) {

		angular.extend($scope, scopeDefaults);

	}

	return stateXController;
});
