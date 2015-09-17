'use strict';

/**
 *
 * Auto load AMD modules through RequireJS
 *
 * Example:
 *
 * <div data-clockwork-module="test"></div>
 *
 * File: /amm/amd_module/release/test.js
 * File Contents:
 *     define(function(){
 *         return: {
 *             run: function(){
 *                 console.info('Ran!');
 *             }
 *         }
 *     });
 *
 * $('body').on('loading.cw.module', function(){ console.info(['loading', arguments]); });
 *
 * Loader Next Steps:
 * 1. Sets data('clockwork-module-loading', '')
 * 2. Sets data('clockwork-module-loaded', '')
 * 3. Fires event on loaded DOM element .trigger('loaded.cw.module')
 *     - $('body').on('loaded.cw.module', function(){ console.info(['loaded', arguments]); });
 * 4. If there was an error calling run, fires .trigger('run_error.cw.module')
 *     - $('body').on('run_error.cw.module', function(){ console.info(['error', arguments]); });
 *
 */

define(['jquery'], function ($) {

	// find components on the page
	function run (target, data_selector, event_namespace) {

		var $target = target ? $(target) : null;

		var $containers = target ? $target.find('[data-' + data_selector + ']') : $('[data-' + data_selector + ']');
		if (target && $target.data(data_selector)) {
			$.merge($containers, $target);
		}

		// find all of the components on the page and run their module inits
		$containers.each(function (i, container) {

			var $container  = $(container);
			var module_type = $container.data(data_selector);

			if ($container.data(data_selector + '-loading') || $container.data(data_selector + '-loaded')) {
				return;
			} else {
				$container.data(data_selector + '-loading', true);
			}

			$.each(module_type.split(' '), function (i, type) {

				$container.trigger('loading.' + event_namespace, [type, $container]);

				require([type], function (module) {

					try {
						module.run(container);
					} catch (err) {
						$container.trigger('run_error.' + event_namespace, [type, $container, err]);
					}

					$container
						.data(data_selector + '-loading', '')
						.data(data_selector + '-loaded', true)
						.trigger('loaded.' + event_namespace, [type, $container]);
				});
			});


		});
	}

	var methods = {

		setup: function (data_selector, event_namespace) {

			if (!data_selector) {
				data_selector = 'clockwork-module';
			}

			if (!event_namespace) {
				event_namespace = '.cw.module';
			}

			$(document).ready(function () {

				$('body')
					.on('loaded' + event_namespace, function (evt) {
						run(evt.target, data_selector, event_namespace);
					})
					.on('load' + event_namespace, function (evt) {
						run(evt.target, data_selector, event_namespace);
					});

				run(null, data_selector, event_namespace);
			});

		},

		run: run

	};

	return methods;
});
