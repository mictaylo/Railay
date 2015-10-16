'use strict';

(function () {
	class Test extends Object {
		constructor (arg1) {
			super(arg1);
		}

		method1 (arg2) {

		}

		static method2 (arg3) {

		}
	}

	console.info(new Test());
}());

(function () {

	var name = 'Bob', time = 'today';
	console.info(`Hello ${name}, how are you ${time}?`);
}());
