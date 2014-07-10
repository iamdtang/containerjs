(function() {

	function Container() {
		this._bindings = {};
		this._singletons = {};
	}

	Container.prototype.bind = function(abstract, impl) {
		this._bindings[abstract] = impl;
	};

	Container.prototype.make = function(abstract) {
		if (this._bindings[abstract]) {
			return this._bindings[abstract]();
		}

		if (typeof this._singletons[abstract] === 'function') {
			this._singletons[abstract] = this._singletons[abstract]();
		}

		return this._singletons[abstract];
	};

	Container.prototype.singleton = function(abstract, impl) {
		this._singletons[abstract] = impl;
	};

	Container.prototype.instance = function(abstract, impl) {
		this._singletons[abstract] = impl;
	};

	if (typeof window !== 'undefined') {
		window.Container = Container;
	} else {
		module.exports = Container;
	}

})();