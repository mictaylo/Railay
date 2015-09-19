'use strict';

define(['../../app.module'], function (app) {

	app.controller('StateXController', stateXController);

	stateXController.$inject = [
		'$scope'
	];

	function stateXController ($scope) {
		$scope.controllerHasInitialized = true;
	}

	return stateXController;
});
