'use strict';

/**
 *
 * Name: jQuery Plugin Module
 * Author: kevin@clockwork.net
 *
 * Documentation is located on the intranet
 *
 */

(function ( definition ) {
	if (window.define) {
		define(['jquery'], definition);
	}else if (window.jQuery) {
		definition(window.jQuery);
	}
}(function ($) {

	return function ( givenName, initialAddon ) {

		// Given name may not be compatible with javascript object keys, css names, data, attributes, etc.
		var pluginName = givenName.toLowerCase().replace(/[^a-zA-Z\d\-]/g, '_');

		// Shared settings should not be overwritten.
		// They are conventions shared across all plugins.
		var sharedSettings = {
			plugin_name     : pluginName,                     // Used for name spacing and registering plugin
			jquery_name     : 'cw_' + pluginName,             // Used for registering with jQuery
			data_key        : 'cw_' + pluginName + '-options',// Namespace plugin data
			event_suffix    : '.cw.' + pluginName,            // Namespace events
			data_attr_prefix: 'data-cw-' + pluginName + '-',  // Use this to make all html attributes consistent
			css_prefix      : 'cw-' + pluginName + '-'        // Use this to make all css classes consistent
		};

		var settings = {
			// Plugin can be assigned default settings to be overwritten at initialization.
			standard          : settingsFn,
			// Used for addons.
			// Default settings may be a function so that $(this) can be used within the settings.
			// Because settings may be a function, we cannot simple extend them.
			default_extensions: [],
			// Theme can override default settings
			theme             : {}
		};

		function settingsFn () {
			return {};
		}

		// Scope instance specific methods
		var methods = {

			// Automatically called when plugin is initialized on a new instance.
			_init: function (instanceSettings) {

				var self = this;

				/**
				 * Default Settings
				 * function || object
				 *
				 * These are base settings that can be overridden by the theme, data attributes or instance specific settings
				 * If a function is passed in, this will refer to the element selected through jQuery.
				 * settings.default_extensions are intended to be additions to settings necessary for addons.
				 * settings.default_extensions may not always be in the same order depending on how the addon was loaded, these settings should be unique.
				 *
				 * Example: $.fn.pluginName.extend_settings({ setting1: true });
				 */
				var defaultSettings = settings.standard;
				defaultSettings = defaultSettings.apply(this);
				$.each(settings.default_extensions, function (i, extension) {
					if (typeof extension === 'function') {
						$.extend(true, defaultSettings, extension.apply(self));
					} else {
						$.extend(true, defaultSettings, extension);
					}
				});
				/**
				 * Theme Settings
				 * function || object
				 *
				 * A single set for settings that override all default settings and default setting extensions.
				 * This is intended to be a way for the theme to override any setting without worrying about addons or loading order.
				 * There can only be one of these
				 *
				 * Example: $.fn.pluginName.override_settings({ setting1: false });
				 */
				var themeSettings = settings.theme;

				if (typeof themeSettings === 'function') {
					themeSettings = themeSettings.apply(this);
				}

				var $el     = $(this),
					options = $.extend(true, {}, defaultSettings, themeSettings, $el.data(), instanceSettings);

				// Store data on the element for use later
				$el.data($.fn[sharedSettings.jquery_name].data_key, options);

				return this;
			},

			// Emit a name spaced event
			emit: function (eventKey, optionalDataArray, optionalChildSelector) {

				var $target = optionalChildSelector ? $(this).find(optionalChildSelector) : $(this);
				$target.trigger(eventKey + $.fn[sharedSettings.jquery_name].event_suffix, optionalDataArray);

				return this; // return this to maintain chaining.
			},

			// Listen for a name spaced event
			watch: function (eventKey, optionalCallback, optionalChildSelector) {

				$(this).on(eventKey + $.fn[sharedSettings.jquery_name].event_suffix, optionalChildSelector, optionalCallback);

				return this; // return this to maintain chaining.
			},

			// Detach listener for a name spaced event
			end_watch: function (eventKey, optionalHandler, optionalChildSelector) {

				$(this).off(eventKey + $.fn[sharedSettings.jquery_name].event_suffix, optionalChildSelector, optionalHandler);

				return this; // return this to maintain chaining.
			}
		};

		// Keep track of all methods called during the initialization process of a new instance.
		var addons = [methods._init];

		// Scope config methods.
		// These are not specific to an instance, they relate to the plugin itself.
		var configMethods = {

			// Create a new instance of the plugin on an element
			run: function (element) {

				return $(element)[sharedSettings.jquery_name]();

			},

			// Used as a final override to all default settings, there can only be one of these.
			// Intended use: Site wide theme overrides.
			override_settings: function (newSettings) {
				settings.theme = newSettings;
			},

			// Used to add onto the default settings.
			// Cannot necessarily depend on the order of evaluating these so these should be unique.
			// There can be multiple of these.
			// Intended use: Settings related to addons.
			extend_settings: function (newSettings) {
				settings.default_extensions.push(newSettings);
			},

			// Add additional functionality.
			addon: function (addonSetup) {
				if (addonSetup.methods) {
					$.extend(methods, addonSetup.methods, methods);
					if (addonSetup.init_fn_name) {
						addons.push(addonSetup.methods[addonSetup.init_fn_name]);
					}
				}
				if (addonSetup.default_settings) {
					configMethods.extend_settings(addonSetup.default_settings);
				}
			}
		};

		$.fn[sharedSettings.jquery_name] = function (method) {
			/**
			 * Used to prevent use of functions prefixed with an underscore
			 * if a method is provided call that, otherwise treat it as an initiation
			 * Do not edit below this
			 **/
			var args = arguments;
			// If the first argument is a string that does not start with an underscore, attempt to call that method.
			// Underscored are used with private methods.  Call them using:
			//     - methods._example.apply(this, arg1, arg2);
			//     - $.proxy(methods._example, this, [arg1, arg2]
			// Example: $( ... ).pluginName('method_x', arg1, arg2);
			if (methods[method] && method.charAt(0) !== '_') {
				var methodArgs = Array.prototype.slice.call(args, 1);
				// jQuery.map() is used to return results properly
				return $(this).map(function (i, val) {
					// Create a custom event for other js to add functionality to function calls.
					// If an event handle calls event.preventDefault() the method will be cancelled.
					var event = new $.Event('method_firing' + sharedSettings.event_suffix);
					$(this).trigger(event, [method, methodArgs]);
					if (!event.isDefaultPrevented()) {
						var result = methods[method].apply(this, methodArgs);
						// Custom event fired if the method was ran.
						$(this).trigger('method_fired' + sharedSettings.event_suffix, [method, methodArgs]);
						// Method was ran, return the result.
						return result;
					} else {
						// return this to maintain chaining.
						return this;
					}
				});
			} else if (((!!method) && method.constructor === Object) || !method) {
				var $self = $(this);
				// If the first argument is undefined or an object, run the initialization process on the selected elements to create new instances.
				// Example: $( ... ).pluginName({ setting_x: true });
				// jQuery.map() is used to return results properly
				return $self.map(function (elI, el) {
					var $el = $(this);
					// Custom event when the new instance is about to be created.
					$el[sharedSettings.jquery_name]('emit', ['initializing']);
					// Run all init functions from addons
					$.each(addons, function (addonI, addon) {
						addon.apply(el, args);
					});
					// Custom event when the new instance is created and the initialization process finishes.
					$el[sharedSettings.jquery_name]('emit', ['initialized']);
					// return this to maintain chaining.
					return this;
				});
			}
		};

		// Add config methods and settings to the jQuery reference for access later
		// Example: $.fn.pluginName.addon( );
		// Example: $.fn.pluginName.event_suffix;
		$.extend($.fn[sharedSettings.jquery_name], configMethods, sharedSettings);

		if (initialAddon) {
			$.fn[sharedSettings.jquery_name].addon(initialAddon);
		}

		return $.fn[sharedSettings.jquery_name];
	};
}));
