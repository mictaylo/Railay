## Intention
- `[ ]` Angular
- `[ ]` React
- `[~]` Linting
	- `[X]` esLint
		- .eslintrc
	- `[ ]` sass lint?
		- ...rc?
- `[X]` es6 - Babble
	- `*.es6.js`
- `[?]` webpack
- `[X]` require
- `[~]` require optimizer
	- Issue: Only runs on individual files
- `[~]` karma + jasmine
	- Issue: autotest fails with es6, needs babel to finish on dist from watch-build
- `[X]` gulp
- `[ ]` yoman/gulp generator
	- AMD module, Component, Angular (module, service, directive, etc), (All) With tests
	- `npm install -g generator-generator`
- `[X]` bower
- `[X]` SASS

# Install Instructions

## First time setup

1. Grab a copy of the project from GitHub.

	`git clone https://github.com/keobrien/Railay.git`

1. Install Node.js/npm by downloading at [nodejs.org](http://nodejs.org)
1. Install bower globally

	`npm install bower -g`

1. To make gulp commands easier, install the gulp package globally

    `npm install gulp -g`
    
## Every Time Setup

1. Install Node dependancies

    `npm install`

1. Install Bower dependancies

    `bower install`

## Run

### Dev mode

1. `gulp serve-dev`
1. Go to [localhost:3000](http://localhost:3000)


### Dev mode and watch files to run tests/linting

1. `gulp serve-test`
1. Go to [localhost:3000](http://localhost:3000)


### Compiled mode

1. `gulp serve-dist`
1. Go to [localhost:3000](http://localhost:3000)
