'use strict';

require(['config'], function (config) {
	require(['cw-amd/loader', 'ngExample/app'], function (amdLoader) {
		amdLoader.setup();
	});
});
