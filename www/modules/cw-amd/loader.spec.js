'use strict';

define(['jquery', './loader'], function ($, loader) {

	describe('AMD Auto Loader.', function () {

		var $body        = $('body');
		var $head        = $('head');
		var data_prefix  = 'clockwork-module';
		var evt_suffix   = '.cw.module';
		var $el          = null;
		var watcher      = null;
		var load_promise = null;
		var success_el   = '<div data-clockwork-module="test-module-for-loader_test_js"></div>';

		define('test-module-for-loader_test_js', [], function () {
			return {
				run: function () {
				}
			};
		});

		function run_loader () {
			loader.run(null, data_prefix, evt_suffix.replace(/^\./, ''));
		}

		beforeEach(function () {
			load_promise = new $.Deferred();
			watcher      = jasmine.createSpyObj('watcher', ['spy']);
		});

		afterEach(function () {
			if ($el) {
				$el.remove();
			}
			$el = null;
		});

		describe('Init.', function () {
			it('Loads and fires.', function () {
				expect(loader).toBeDefined();
			});

			it('Has a setup function.', function () {
				expect(loader.setup).toBeDefined();
			});

			it('Has a run function.', function () {
				expect(loader.run).toBeDefined();
			});
		});

		describe('Kicking off loading.', function () {
			it('Loads modules in body, adds data attribute.', function () {
				$el = $(success_el).appendTo($body);
				run_loader();
				expect($el.data(data_prefix + '-loading')).toBe(true);
			});

			it('Loads modules in head, adds data attribute.', function () {
				$el = $('<meta data-clockwork-module="test-module-for-loader_test_js" />').appendTo($head);
				run_loader();
				expect($el.data(data_prefix + '-loading')).toBe(true);
			});

			it('Fires loading event.', function () {
				$el = $(success_el).appendTo($body);
				$el.on('loading' + evt_suffix, watcher.spy);
				run_loader();
				expect(watcher.spy.calls.count()).toEqual(1);
			});

			it('Loading event has correct params.', function () {
				$el = $(success_el).appendTo($body);
				$el.on('loading' + evt_suffix, function (evt, type, $container) {
					expect(evt.target).toBe($el[0]);
					expect(type).toBe('test-module-for-loader_test_js');
					expect($container[0]).toBe($el[0]);
				});
				run_loader();
			});
		});

		describe('Loading success.', function () {
			it('Calls run function.', function (done) {

				define('test3-module-for-loader_test_js', [], function () {
					return {
						run: function () {
							watcher.spy.apply(this, arguments);
							load_promise.resolve();
						}
					};
				});

				$el = $('<div data-clockwork-module="test3-module-for-loader_test_js"></div>').appendTo($body);
				run_loader();
				load_promise.always(function () {
					expect(watcher.spy.calls.count()).toEqual(1);
					done();
				});
			});

			it('Fires loaded event with correct params.', function (done) {
				$el = $(success_el).appendTo($body);
				$el.on('loaded' + evt_suffix, function (evt, type, $container) {
					expect(evt.target).toBe($el[0]);
					expect(type).toBe('test-module-for-loader_test_js');
					expect($container[0]).toBe($el[0]);
					done();
				});
				run_loader();
			});
		});

		describe('Loading errors.', function () {
			it('Fires error event when run is not defined', function (done) {

				define('test-fail-module-for-loader_test_js', [], watcher.spy);

				$el = $('<div data-clockwork-module="test-fail-module-for-loader_test_js"></div>').appendTo($body);
				$el.on('run_error' + evt_suffix, function (evt, type, $container) {
					expect(watcher.spy.calls.count()).toEqual(1);
					expect(evt.target).toBe($el[0]);
					expect(type).toBe('test-fail-module-for-loader_test_js');
					expect($container[0]).toBe($el[0]);
					done();
				});
				run_loader();
			});
		});

	});
});
