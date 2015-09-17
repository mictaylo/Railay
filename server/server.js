var config = require('../config')(process.env.NODE_ENV),
	express = require('express'),
	app = express(),
	swig = require('swig');

swig.setDefaults({
	locals: {
		config: config
	}
});

require('./routes.js')(app, express, config);

var server = app.listen(config.server.port, function () {
	console.info('Serving on http://localhost:' + config.server.port);
});
