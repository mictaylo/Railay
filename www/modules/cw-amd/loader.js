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
	function run (target, dataSelector, eventNamespace) {

		var $target = target ? $(target) : null;

		var $containers = target ? $target.find('[data-' + dataSelector + ']') : $('[data-' + dataSelector + ']');
		if (target && $target.data(dataSelector)) {
			$.merge($containers, $target);
		}

		// find all of the components on the page and run their module inits
		$containers.each(function (i, container) {

			var $container  = $(container);
			var moduleType = $container.data(dataSelector);

			if ($container.data(dataSelector + '-loading') || $container.data(dataSelector + '-loaded')) {
				return;
			} else {
				$container.data(dataSelector + '-loading', true);
			}

			$.each(moduleType.split(' '), function (iType, type) {

				$container.trigger('loading.' + eventNamespace, [type, $container]);

				require([type], function (module) {

					try {
						module.run(container);
					} catch (err) {
						$container.trigger('run_error.' + eventNamespace, [type, $container, err]);
					}

					$container
						.data(dataSelector + '-loading', '')
						.data(dataSelector + '-loaded', true)
						.trigger('loaded.' + eventNamespace, [type, $container]);
				});
			});


		});
	}

	var methods = {

		setup: function (dataSelector, eventNamespace) {

			if (!dataSelector) {
				dataSelector = 'clockwork-module';
			}

			if (!eventNamespace) {
				eventNamespace = '.cw.module';
			}

			$(document).ready(function () {

				$('body')
					.on('loaded' + eventNamespace, function (evt) {
						run(evt.target, dataSelector, eventNamespace);
					})
					.on('load' + eventNamespace, function (evt) {
						run(evt.target, dataSelector, eventNamespace);
					});

				run(null, dataSelector, eventNamespace);
			});

		},

		run: run

	};

	return methods;
});
