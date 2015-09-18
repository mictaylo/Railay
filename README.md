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

# Install Instructions

## First time setup

1. Install Node.js/npm by downloading at [nodejs.org](http://nodejs.org)
1. Install bower globally

	`npm install bower -g`

1. To make gulp commands easier, install the gulp package globally

    `npm install gulp -g`
    
1. Install SASS so that Chrome can tie source maps back to the SASS line number

	`gem install sass`
    
## Every Time Setup
1. Grab a copy of the project from GitHub.

	`git clone https://github.com/keobrien/Railay.git`

1. Install Node dependancies

    `npm install`

1. Install Bower dependancies

    `bower install`

## Run

### Dev mode

1. `gulp serve-dev`
1. Go to [localhost:3000](http://localhost:3000)


### Test mode and watch files to run tests/linting

1. `gulp serve-test`
1. Go to [localhost:3000](http://localhost:3000)


### Compiled mode

1. `gulp serve-dist`
1. Go to [localhost:3000](http://localhost:3000)
