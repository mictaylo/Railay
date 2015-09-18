var swig = require('swig'),
    fs   = require('fs');

var _403Forbidden = [
	'*.swig'
];

module.exports = function (app, express, config) {

	app.engine('swig', swig.renderFile);
	app.set('view engine', 'swig');
	app.set('view cache', true);
	app.set('views', process.cwd() + '/' + config.server.www_root + '/');
	swig.setDefaults({cache: false});
	swig.setDefaults({loader: swig.loaders.fs(process.cwd() + '/' + config.server.www_root + '/')});

	app.get(_403Forbidden, function (req, res) {
		res.status(403);
		res.send('403').end();
	});

	app.use('/bower_components', express.static(config.bower.directory));
	app.use('/', express.static(config.server.www_root + '/'));

	app.get('*', function (req, res) {

		var path    = req._parsedUrl.path,
			fsPath = process.cwd() + '/' + config.server.www_root + path;

		try {
			var stats = fs.lstatSync(fsPath);

			if (stats.isDirectory) {
				res.render(fsPath + 'index.swig');
			} else if (stats.isFile && (path.indexOf(/\.html$/) > 0)) {
				res.render(fsPath);
			}
		} catch (err) {
			res.status(404);
			res.send('404').end();
		}
	});
};
