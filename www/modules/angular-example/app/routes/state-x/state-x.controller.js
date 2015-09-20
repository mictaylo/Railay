'use strict';

define(['angular', '../../app.module'], function (angular, app) {

	app.controller('StateXController', stateXController);

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
