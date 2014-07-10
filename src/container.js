(function() {

	function Container() {
		this._bindings = {};
		this._singletons = {};
	}

	Container.prototype.bind = function(abstract, impl) {
		this._bindings[abstract] = impl;
	};

	Container.prototype.make = function(abstract) {
		if (this._bindings.hasOwnProperty(abstract)) {
			return this._bindings[abstract]();
		}

		if (this._singletons.hasOwnProperty(abstract)) {
			if (typeof this._singletons[abstract] === 'function') {
				this._singletons[abstract] = this._singletons[abstract]();
			}
			
			return this._singletons[abstract];
		}

		if (typeof abstract === 'function') {
			return new abstract();
		}
	};

	Container.prototype.singleton = function(abstract, impl) {
		this._singletons[abstract] = impl;
	};

	Container.prototype.instance = function(abstract, impl) {
		this._singletons[abstract] = impl;
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