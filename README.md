## Environment Features
- Linting/Code Style
	- IDE
		- [.editorconfig](http://editorconfig.org/)
		- [Sublime Text Plugin](https://github.com/sindresorhus/editorconfig-sublime)
	- Javascript
		- [.eslintrc](http://eslint.org/)
		- [Submlime Text Plugin](https://github.com/roadhump/SublimeLinter-eslint)
- [Karma](http://karma-runner.github.io/0.13/index.html) + [Jasmine](http://jasmine.github.io/)
- [gulp](http://gulpjs.com/)
- [Bower](http://bower.io/)
- [SASS](http://sass-lang.com/)
- ECMAScript 6 - [Babble](https://babeljs.io)
	- Any files with the name ending in `*.es6.js` will be translated to es5 during build
- [RequireJS](http://requirejs.org/)
	- Assumption: Any Javascript in the /modules folder will be loaded by RequireJS
	- Karma/Jasmin is configured to test Javascript in the /modules folder as RequireJS modules

## Features Wish List
- [PostCSS](https://github.com/postcss/postcss)
	- Consider: Replace SASS (libsass) for a performance increase.
- [Webpack](https://webpack.github.io/)
- [Bower Shrinkwrap/Lock File](https://github.com/bower/bower/issues/505)
- [Yeoman](http://yeoman.io/) generator
	- Default templates
		- AMD module
		- Component
		- Angular (module, service, directive, etc)
		- React components
		- (All) With tests
	- Dev notes:
		- `npm install -g generator-generator`
		- `npm link`
- [gulp-jsdoc](https://www.npmjs.com/package/gulp-jsdoc)
- [SASS Doc](http://sassdoc.com/gulp/)
- Use NodeJS to scan modules directory and auto-generate a sitemap of examples that use the base template

# Install Instructions

## First time setup

1. Install Node.js/npm by downloading at [nodejs.org](http://nodejs.org)

1. Install SASS so that Chrome can tie source maps back to the SASS line number

	`gem install sass`
    
## Every Time Setup
1. Grab a copy of the project from GitHub.

	`git clone https://github.com/keobrien/Railay.git`

1. Install Node and Bower dependancies

    `npm install`

## Run

### Dev mode

1. `npm start`
1. Go to [localhost:3000](http://localhost:3000)


### Test mode and watch files to run tests/linting

1. `npm test`
1. Go to [localhost:3000](http://localhost:3000)


### Compiled mode

1. `npm run-script build`
1. Go to [localhost:3000](http://localhost:3000)

## Advanced Commands

These commands will run the local versions of Gulp or Bower rather than needing to install them globally

### Gulp

1. `npm run-script gulp -- serve-dev`
1. `npm run-script gulp -- serve-test`
1. `npm run-script gulp -- serve-dist`

This can be used to run any gulp task defined.  It will use the local project version rather than a global.

Alternatively you gou also run `npm install gulp -g` and use `gulp serve-dev`

### Bower

1. `npm run-script bower -- install jquery`
1. `npm run-script bower -- install jquery --save-dev`

This can be used to run any Bower command.  It will use the local project version rather than a global.

Alternatively you gou also run `npm install bower -g` and use `bower install jquery`
