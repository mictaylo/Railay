'use strict';

define(['jquery', './jquery-plugin'], function ($, jqueryPlugin) {

	var $body      = $('body'),
		$el        = null,
		$wrap      = null,
		$child     = null,
		watcher    = null,
		plugin     = null,
		$wrapDiv  = $('<div class="wrap"></div>'),
		$div       = $('<div class="parent"></div>'),
		$childDiv = $('<div class="child"></div>');

	function setup (plObj) {
		$wrap = $wrapDiv.clone().appendTo($body);
		$child = $childDiv.clone();
		$el = $div.clone().append($child).appendTo($wrap);
		watcher = jasmine.createSpyObj('watcher', ['spy', 'spy2']);
		if (plObj) {
			plugin = jqueryPlugin('plugin_tester', plObj);
		} else {
			plugin = jqueryPlugin('plugin_tester');
		}
	}

	function reset () {
		if ($el) {
			$el.remove();
		}
		if ($wrap) {
			$wrap.remove();
		}
		$el = null;
		$wrap = null;
		$child = null;
		plugin = null;
		$.fn.cw_plugin_tester = null;
	}

	function restPluginWithIntialValue (obj) {
		reset();
		setup(obj);
	}

	function testBeforeAfterCancel (method, addon) {

		it('Fires method_firing', function () {
			if (addon) {
				restPluginWithIntialValue(addon);
			}
			$el.on('method_firing' + $.fn.cw_plugin_tester.event_suffix, watcher.spy);
			$el.cw_plugin_tester(method);
			expect(watcher.spy.calls.count()).toEqual(1);
		});

		it('Fires method_firing with params', function () {
			if (addon) {
				restPluginWithIntialValue(addon);
			}
			$el.on('method_firing' + $.fn.cw_plugin_tester.event_suffix, watcher.spy);
			$el.cw_plugin_tester(method, '293472938749283', '981723796234876');

			expect(watcher.spy.calls.argsFor(0)[0].type).toEqual('method_firing');
			expect(watcher.spy.calls.argsFor(0)[0].target).toBe($el[0]);
			expect(watcher.spy.calls.argsFor(0)[1]).toBe(method);
			expect(watcher.spy.calls.argsFor(0)[2]).toEqual(['293472938749283', '981723796234876']);
		});

		it('method_fired can be cancelled', function () {
			if (addon) {
				restPluginWithIntialValue(addon);
			}
			$el.on('method_firing' + $.fn.cw_plugin_tester.event_suffix, function (evt) {
				evt.preventDefault();
				watcher.spy();
			});
			$el.on('method_fired' + $.fn.cw_plugin_tester.event_suffix, watcher.spy2);
			$el.cw_plugin_tester(method, 'test_child_event_983475');

			expect(watcher.spy.calls.count()).toEqual(1);
			expect(watcher.spy2.calls.count()).toEqual(0);
		});

		it('Fires method_fired with params', function () {
			if (addon) {
				restPluginWithIntialValue(addon);
			}
			$el.on('method_fired' + $.fn.cw_plugin_tester.event_suffix, watcher.spy);
			$el.cw_plugin_tester(method, '8273465873465', '927364872634');

			expect(watcher.spy.calls.argsFor(0)[0].type).toEqual('method_fired');
			expect(watcher.spy.calls.argsFor(0)[0].target).toBe($el[0]);
			expect(watcher.spy.calls.argsFor(0)[1]).toBe(method);
			expect(watcher.spy.calls.argsFor(0)[2]).toEqual(['8273465873465', '927364872634']);
		});
	}

	describe('jQuery Plugin Creator.', function () {
		beforeEach(function () {
			setup();
		});

		afterEach(function () {
			reset();
		});

		describe('Loads and fires.', function () {

			it('Creates plugins prefixed with CW in jQuery.fn.', function () {
				expect($.fn.cw_plugin_tester).toBeDefined();
				expect($.fn.cw_plugin_tester).toBe(plugin);
			});

			it('Has correct namespaces.', function () {
				expect($.fn.cw_plugin_tester.plugin_name).toBe('plugin_tester');
				expect($.fn.cw_plugin_tester.jquery_name).toBe('cw_plugin_tester');
				expect($.fn.cw_plugin_tester.data_key).toBe('cw_plugin_tester-options');
				expect($.fn.cw_plugin_tester.event_suffix).toBe('.cw.plugin_tester');
				expect($.fn.cw_plugin_tester.data_attr_prefix).toBe('data-cw-plugin_tester-');
				expect($.fn.cw_plugin_tester.css_prefix).toBe('cw-plugin_tester-');
			});

			it('Has correct config methods.', function () {
				expect($.fn.cw_plugin_tester.run).toBeDefined();
				expect($.fn.cw_plugin_tester.override_settings).toBeDefined();
				expect($.fn.cw_plugin_tester.extend_settings).toBeDefined();
				expect($.fn.cw_plugin_tester.addon).toBeDefined();
			});

			it('Can initialize plugin with settings.', function () {
				$el.cw_plugin_tester({
					test_setting: true
				});
				var options = $el.data($.fn.cw_plugin_tester.data_key);
				expect(options).toBeDefined();
				expect(options.test_setting).toBe(true);
			});
		});

		describe('Emit method.', function () {

			it('Fires with correct name space.', function () {
				$wrap.on('test_event' + $.fn.cw_plugin_tester.event_suffix, watcher.spy);
				$el.cw_plugin_tester('emit', 'test_event');
				expect(watcher.spy.calls.count()).toEqual(1);
			});

			it('Sends custom params.', function () {
				$wrap.on('test_event' + $.fn.cw_plugin_tester.event_suffix, watcher.spy);
				$el.cw_plugin_tester('emit', 'test_event', [true, 'asd']);
				expect(watcher.spy.calls.count()).toEqual(1);
				expect(watcher.spy.calls.argsFor(0)[0].type).toEqual('test_event');
				expect(watcher.spy.calls.argsFor(0)[1]).toBe(true);
				expect(watcher.spy.calls.argsFor(0)[2]).toBe('asd');
			});

			it('Can fire on child elements', function () {
				$el.on('test_child_event' + $.fn.cw_plugin_tester.event_suffix, watcher.spy);
				$el.cw_plugin_tester('emit', 'test_child_event', null, '.child');
				expect(watcher.spy.calls.count()).toEqual(1);

				var evtArg = watcher.spy.calls.argsFor(0)[0];
				expect(evtArg.target).toBe($child[0]);
			});

			it('Child emits send custom params', function () {
				$el.on('test_child_event_128763' + $.fn.cw_plugin_tester.event_suffix, watcher.spy);
				$el.cw_plugin_tester('emit', 'test_child_event_128763', [true, 'qwe'], '.child');

				expect(watcher.spy.calls.count()).toEqual(1);
				expect(watcher.spy.calls.argsFor(0)[0].type).toEqual('test_child_event_128763');
				expect(watcher.spy.calls.argsFor(0)[0].target).toBe($child[0]);
				expect(watcher.spy.calls.argsFor(0)[1]).toBe(true);
				expect(watcher.spy.calls.argsFor(0)[2]).toBe('qwe');
			});

			it('Fires method_firing event before method', function () {
				$el.on('method_firing' + $.fn.cw_plugin_tester.event_suffix, function () {
					expect(watcher.spy2.calls.count()).toEqual(0);
					watcher.spy();
				});
				$el.on('test_child_event_2784' + $.fn.cw_plugin_tester.event_suffix, watcher.spy2);
				$el.cw_plugin_tester('emit', 'test_child_event_2784');

				expect(watcher.spy.calls.count()).toEqual(1);
				expect(watcher.spy2.calls.count()).toEqual(1);
			});

			it('method can cancel method', function () {
				$el.on('method_firing' + $.fn.cw_plugin_tester.event_suffix, function (evt) {
					evt.preventDefault();
					watcher.spy();
				});
				$el.on('test_child_event_287346' + $.fn.cw_plugin_tester.event_suffix, watcher.spy2);
				$el.cw_plugin_tester('emit', 'test_child_event_287346');

				expect(watcher.spy.calls.count()).toEqual(1);
				expect(watcher.spy2.calls.count()).toEqual(0);
			});

			it('Fires method_fired event after method', function () {
				$el.on('method_fired' + $.fn.cw_plugin_tester.event_suffix, watcher.spy);
				$el.on('test_child_event_123986' + $.fn.cw_plugin_tester.event_suffix, function () {
					expect(watcher.spy.calls.count()).toEqual(0);
					watcher.spy2();
				});
				$el.cw_plugin_tester('emit', 'test_child_event_123986');

				expect(watcher.spy.calls.count()).toEqual(1);
				expect(watcher.spy2.calls.count()).toEqual(1);
			});

			testBeforeAfterCancel('emit');

		});

		describe('watch method.', function () {

			it('Catches emit calls.', function () {
				$el.cw_plugin_tester('watch', 'test_child_event_3495876', watcher.spy);
				$el.cw_plugin_tester('emit', 'test_child_event_3495876');
				expect(watcher.spy.calls.count()).toEqual(1);
			});

			it('Catches emit calls on child elements.', function () {
				$el.cw_plugin_tester('watch', 'test_child_event_3495876', watcher.spy);
				$el.cw_plugin_tester('emit', 'test_child_event_3495876', '.child');
				expect(watcher.spy.calls.count()).toEqual(1);
			});

			it('Watches emit calls on child elements.', function () {
				$el.cw_plugin_tester('watch', 'test_child_event_3495876', watcher.spy);
				$el.cw_plugin_tester('watch', 'test_child_event_3495876', watcher.spy, '.child');
				$el.cw_plugin_tester('emit', 'test_child_event_3495876', null, '.child');
				expect(watcher.spy.calls.count()).toEqual(2);
				expect(watcher.spy.calls.argsFor(0)[0].target).toBe($child[0]);
				expect(watcher.spy.calls.argsFor(1)[0].target).toBe($child[0]);
			});

			it('Recieves custom params', function () {
				$el.cw_plugin_tester('watch', 'test_child_event_238476', watcher.spy);
				$el.cw_plugin_tester('emit', 'test_child_event_238476', [true, '238476']);
				expect(watcher.spy.calls.argsFor(0)[0].target).toBe($el[0]);
				expect(watcher.spy.calls.argsFor(0)[1]).toBe(true);
				expect(watcher.spy.calls.argsFor(0)[2]).toBe('238476');
			});

			it('Watching child custom params', function () {
				$el.cw_plugin_tester('watch', 'test_child_event_872634', watcher.spy, '.child');
				$el.cw_plugin_tester('emit', 'test_child_event_872634', [true, '872634'], '.child');
				expect(watcher.spy.calls.argsFor(0)[0].target).toBe($child[0]);
				expect(watcher.spy.calls.argsFor(0)[1]).toBe(true);
				expect(watcher.spy.calls.argsFor(0)[2]).toBe('872634');
			});

			testBeforeAfterCancel('watch');
		});

		describe('end_watch method', function () {

			it('Should stop watch from catching emit', function () {
				$el.cw_plugin_tester('watch', 'test_child_event_837465', watcher.spy);
				$el.cw_plugin_tester('emit', 'test_child_event_837465');
				expect(watcher.spy.calls.count()).toEqual(1);
				$el.cw_plugin_tester('end_watch', 'test_child_event_837465');
				$el.cw_plugin_tester('emit', 'test_child_event_837465');
				expect(watcher.spy.calls.count()).toEqual(1);
			});

			it('Should stop watch from catching child emit', function () {
				$el.cw_plugin_tester('watch', 'test_child_event_239487', watcher.spy, '.child');
				$el.cw_plugin_tester('emit', 'test_child_event_239487', null, '.child');
				expect(watcher.spy.calls.count()).toEqual(1);
				$el.cw_plugin_tester('end_watch', 'test_child_event_239487', null, '.child');
				$el.cw_plugin_tester('emit', 'test_child_event_239487', '.child');
				expect(watcher.spy.calls.count()).toEqual(1);
			});

			it('Should stop specific watch function', function () {
				$el.cw_plugin_tester('watch', 'test_child_event_8374568', watcher.spy);
				$el.cw_plugin_tester('watch', 'test_child_event_8374568', watcher.spy2);
				$el.cw_plugin_tester('emit', 'test_child_event_8374568');
				expect(watcher.spy.calls.count()).toEqual(1);
				expect(watcher.spy2.calls.count()).toEqual(1);
				$el.cw_plugin_tester('end_watch', 'test_child_event_8374568', watcher.spy);
				$el.cw_plugin_tester('emit', 'test_child_event_8374568');
				expect(watcher.spy.calls.count()).toEqual(1);
				expect(watcher.spy2.calls.count()).toEqual(2);
			});

			it('Should stop specific watch function on child', function () {
				$el.cw_plugin_tester('watch', 'test_child_event_298729348', watcher.spy, '.child');
				$el.cw_plugin_tester('watch', 'test_child_event_298729348', watcher.spy2, '.child');
				$el.cw_plugin_tester('emit', 'test_child_event_298729348', null, '.child');
				expect(watcher.spy.calls.count()).toEqual(1);
				expect(watcher.spy2.calls.count()).toEqual(1);
				$el.cw_plugin_tester('end_watch', 'test_child_event_298729348', watcher.spy, '.child');
				$el.cw_plugin_tester('emit', 'test_child_event_298729348', null, '.child');
				expect(watcher.spy.calls.count()).toEqual(1);
				expect(watcher.spy2.calls.count()).toEqual(2);
			});

			testBeforeAfterCancel('end_watch');
		});

		describe('run config method', function () {
			it('Runs.', function () {
				$.fn.cw_plugin_tester.run($el[0]);
				var data = $el.data($.fn.cw_plugin_tester.data_key);
				expect(data).toBeDefined();
			});
		});

		describe('unexpected first params', function () {
			it('Array.', function () {
				var test = function () {
					$el.cw_plugin_tester([]);
				};
				expect(test).not.toThrow();
			});

			it('Int.', function () {
				var test = function () {
					$el.cw_plugin_tester(1);
				};
				expect(test).not.toThrow();
			});

			it('Null.', function () {
				var test = function () {
					$el.cw_plugin_tester(null);
				};
				expect(test).not.toThrow();
			});
		});

		describe('Settings modifiers config methods', function () {

			var initialSettings = {
				initial: '0',
				level0 : {
					level1: {
						level2: '0'
					}
				},
				level0b: '0'
			};

			var addlSettings = {
				level0 : {
					level1: {
						level2: '1'
					}
				},
				level0b: '1',
				level0c: '1'
			};

			var extendSettings = {
				level0 : {
					level1: {
						level2a: '4'
					}
				},
				level0c: '4',
				level0d: '4'
			};

			var overrideSettings = {
				level0: {
					level1b: '5'
				}
			};

			it('Plugin setup can extend a plugin\'s default settings.', function () {
				restPluginWithIntialValue({
					default_settings: initialSettings
				});
				$el.cw_plugin_tester();
				expect($el.data(plugin.data_key)).toEqual(initialSettings);
			});

			it('Addon can extend a plugin\'s default settings.', function () {
				restPluginWithIntialValue();
				plugin.addon({
					default_settings: initialSettings
				});
				$el.cw_plugin_tester();
				expect($el.data(plugin.data_key)).toEqual(initialSettings);
			});

			it('Addons don\'t destroy origonal object', function () {
				restPluginWithIntialValue({
					default_settings: initialSettings
				});
				plugin.addon({
					default_settings: addlSettings
				});
				$el.cw_plugin_tester();
				expect(initialSettings).toEqual({
					initial: '0',
					level0 : {
						level1: {
							level2: '0'
						}
					},
					level0b: '0'
				});
				expect(addlSettings).toEqual({
					level0 : {
						level1: {
							level2: '1'
						}
					},
					level0b: '1',
					level0c: '1'
				});
			});

			it('Addon can add to a plugin\'s default settings.', function () {
				restPluginWithIntialValue({
					default_settings: initialSettings
				});
				plugin.addon({
					default_settings: addlSettings
				});
				$el.cw_plugin_tester();
				expect($el.data(plugin.data_key)).toEqual({
					initial: '0',
					level0 : {
						level1: {
							level2: '1'
						}
					},
					level0b: '1',
					level0c: '1'
				});
			});

			it('Multiple addons merge correctly and do a deep merge.', function () {
				restPluginWithIntialValue({default_settings: initialSettings});
				plugin.addon({default_settings: addlSettings});
				plugin.addon({
					default_settings: {
						level0 : {
							level1 : {
								level2: '2'
							},
							level1b: '2'
						},
						level0c: '2'
					}
				});
				plugin.addon({
					default_settings: {
						level0c: '3'
					}
				});
				$el.cw_plugin_tester();
				expect($el.data(plugin.data_key)).toEqual({
					initial: '0',
					level0 : {
						level1 : {
							level2: '2'
						},
						level1b: '2'
					},
					level0b: '1',
					level0c: '3'
				});
			});

			it('Can extendSettings that already has addons.', function () {
				restPluginWithIntialValue({default_settings: initialSettings});
				plugin.addon({default_settings: addlSettings});
				plugin.extend_settings(extendSettings);
				$el.cw_plugin_tester();
				expect($el.data(plugin.data_key)).toEqual({
					initial: '0',
					level0 : {
						level1: {
							level2 : '1',
							level2a: '4'
						}
					},
					level0b: '1',
					level0c: '4',
					level0d: '4'
				});
			});

			it('Can override settings that have layers of detault settings extentions.', function () {
				restPluginWithIntialValue({default_settings: initialSettings});
				plugin.addon({default_settings: addlSettings});
				plugin.extend_settings(extendSettings);
				plugin.override_settings(overrideSettings);
				$el.cw_plugin_tester();
				expect($el.data(plugin.data_key)).toEqual({
					initial: '0',
					level0 : {
						level1 : {
							level2 : '1',
							level2a: '4'
						},
						level1b: '5'
					},
					level0b: '1',
					level0c: '4',
					level0d: '4'
				});
			});

			it('There con only be one override setting.', function () {
				restPluginWithIntialValue({default_settings: initialSettings});
				plugin.addon({default_settings: addlSettings});
				plugin.extend_settings(extendSettings);
				plugin.override_settings({
					level0 : {
						level1 : {
							level2: '6'
						},
						level1c: '6'
					},
					level0c: '6'
				});
				plugin.override_settings(overrideSettings);
				$el.cw_plugin_tester();
				expect($el.data(plugin.data_key)).toEqual({
					initial: '0',
					level0 : {
						level1 : {
							level2 : '1',
							level2a: '4'
						},
						level1b: '5'
					},
					level0b: '1',
					level0c: '4',
					level0d: '4'
				});
			});

			it('Can override first level addon, extend and override settings with data attributes.', function () {
				restPluginWithIntialValue({default_settings: initialSettings});
				$el.attr('data-level0b', '7');
				plugin.addon({default_settings: addlSettings});
				plugin.extend_settings(extendSettings);
				plugin.override_settings(overrideSettings);
				$el.cw_plugin_tester();
				expect($el.data(plugin.data_key)).toEqual({
					initial: '0',
					level0 : {
						level1 : {
							level2 : '1',
							level2a: '4'
						},
						level1b: '5'
					},
					level0b: 7,
					level0c: '4',
					level0d: '4'
				});
			});

			it('Can override addon, extend, override and data attribute settings with js init time variables.', function () {
				restPluginWithIntialValue({default_settings: initialSettings});
				$el.attr('data-level0b', '7');
				plugin.addon({default_settings: addlSettings});
				plugin.extend_settings(extendSettings);
				plugin.override_settings(overrideSettings);
				$el.cw_plugin_tester({
					level0 : {
						level1 : {
							level2: '8'
						},
						level1b: '8'
					},
					level0c: '8'
				});
				expect($el.data(plugin.data_key)).toEqual({
					initial: '0',
					level0 : {
						level1 : {
							level2 : '8',
							level2a: '4'
						},
						level1b: '8'
					},
					level0b: 7,
					level0c: '8',
					level0d: '4'
				});
			});

			it('Default settings can be a function.', function () {
				plugin.addon({
					default_settings: function () {
						expect(this).toBe($el[0]);
						return {
							test_setting: true
						};
					}
				});
				$el.cw_plugin_tester();
				expect($el.data(plugin.data_key).test_setting).toBeTruthy();
			});

			it('Override settings can be a function.', function () {
				plugin.extend_settings(function () {
					expect(this).toBe($el[0]);
					return {
						test_setting: true
					};
				});
				$el.cw_plugin_tester();
				expect($el.data(plugin.data_key).test_setting).toBeTruthy();
			});

			it('Extend settings can be a function.', function () {
				plugin.override_settings(function () {
					expect(this).toBe($el[0]);
					return {
						test_setting: true
					};
				});
				$el.cw_plugin_tester();
				expect($el.data(plugin.data_key).test_setting).toBeTruthy();
			});
		});

		describe('Addon method.', function () {

			it('Can add methods', function () {
				plugin.addon({
					methods: {
						example1: watcher.spy,
						example2: watcher.spy2
					}
				});
				$el.cw_plugin_tester();
				$el.cw_plugin_tester('example1');
				$el.cw_plugin_tester('example2');
				expect(watcher.spy.calls.count()).toEqual(1);
				expect(watcher.spy2.calls.count()).toEqual(1);
			});

			it('Can add init methods', function () {
				plugin.addon({
					init_fn_name: 'example1',
					methods     : {
						example1: watcher.spy,
						example2: watcher.spy2
					}
				});
				$el.cw_plugin_tester();
				expect(watcher.spy.calls.count()).toEqual(1);
				expect(watcher.spy2.calls.count()).toEqual(0);
			});

			it('Addon methods ', function () {
				plugin.addon({
					init_fn_name: 'example1',
					methods     : {
						example1: watcher.spy,
						example2: watcher.spy2
					}
				});
				$el.cw_plugin_tester();
				expect(watcher.spy.calls.count()).toEqual(1);
				expect(watcher.spy2.calls.count()).toEqual(0);
			});

			it('method_firing is fired before method', function () {
				plugin.addon({
					methods: {
						example: function () {
							expect(watcher.spy.calls.count()).toEqual(0);
							expect(watcher.spy2.calls.count()).toEqual(1);
							watcher.spy();
						}
					}
				});
				$el.cw_plugin_tester();
				$el.on('method_firing' + plugin.event_suffix, watcher.spy2);
				expect(watcher.spy.calls.count()).toEqual(0);
				expect(watcher.spy2.calls.count()).toEqual(0);
				$el.cw_plugin_tester('example');
				expect(watcher.spy.calls.count()).toEqual(1);
				expect(watcher.spy2.calls.count()).toEqual(1);
			});

			it('method_firing can cancel method', function () {
				plugin.addon({methods: {example: watcher.spy}});
				$el.cw_plugin_tester();
				$el.on('method_firing' + plugin.event_suffix, function (evt) {
					evt.preventDefault();
					watcher.spy2();
				});
				expect(watcher.spy.calls.count()).toEqual(0);
				expect(watcher.spy2.calls.count()).toEqual(0);
				$el.cw_plugin_tester('example');
				expect(watcher.spy.calls.count()).toEqual(0);
				expect(watcher.spy2.calls.count()).toEqual(1);
			});

			it('Method called with proper params', function () {
				plugin.addon({methods: {example: watcher.spy}});
				$el.cw_plugin_tester();
				$el.cw_plugin_tester('example', '9234927348', '12983918273');
				expect(watcher.spy.calls.argsFor(0)).toEqual(['9234927348', '12983918273']);
			});

			it('Init method called with proper params', function () {
				var initSettings = {
					test: '827364872634'
				};
				plugin.addon({init_fn_name: 'example', methods: {example: watcher.spy}});
				$el.cw_plugin_tester(initSettings);
				expect(watcher.spy.calls.argsFor(0)).toEqual([initSettings]);
				expect(watcher.spy.calls.argsFor(0)[0]).toBe(initSettings);
			});

			testBeforeAfterCancel('example', {
				methods: {
					example: function () {
					}
				}
			});
		});

	});
});
