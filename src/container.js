(function() {

	function Container() {
		this._bindings = {};
		this._singletons = {};
	}

	Container.prototype.bind = function(name, impl) {
		this._bindings[name] = impl;
	};

	Container.prototype.make = function(name) {
		if (this._bindings.hasOwnProperty(name)) {
			return this._bindings[name]();
		}

		if (this._singletons.hasOwnProperty(name)) {
			if (typeof this._singletons[name] === 'function') {
				this._singletons[name] = this._singletons[name]();
			}
			
			return this._singletons[name];
		}

		if (typeof name === 'function') {
			return new name();
		}
	};

	Container.prototype.singleton = function(name, impl) {
		this._singletons[name] = impl;
	};

	Container.prototype.instance = function(name, impl) {
		this._singletons[name] = impl;
	};

	Container.prototype.parseFunctionArgs = function(fn) {
		var fnStr = fn.toString();
		var argStr = fnStr.substring(fnStr.indexOf('(') + 1, fnStr.indexOf(')'));
		var args;

		if (argStr.trim().length === 0) {
			return null;
		}

		args = argStr.split(',');
		args = args.map(function(arg) {
			return arg.trim();
		});

		return args;
	};

	if (typeof window !== 'undefined') {
		window.Container = Container;
	} else {
		module.exports = Container;
	}

})();