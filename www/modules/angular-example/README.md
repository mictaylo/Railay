## Summary

Based on [John Papa's Angular Style Guide](https://github.com/johnpapa/angular-styleguide).

## Files

	appName/
		app/                              App specific, non reusable code
			routes/                       Routes specific to app
				app.routes.js             App routes config definition
				state1/                   Non-root state definition
				    view3.controller.js   ...See View 1
				    view3.html            ...See View 1
				view1.controller.js       View 1 controller
				view1.html                View 1 template
				view2.controller.js       ...See View 1
				view2.html                ...See View 1
			app.module.js                 App definition.  Includes all feature modules
		feature1/
			feature1.js                   RequireJS list for feature files
			feature1.module.js            Feature 1 module definition
			feature1.<type>.js            <type> = config | directive | service | factory | provider | route
		app.js                            angular.bootstrap and dependencies
		app.scss                          sass @imports
