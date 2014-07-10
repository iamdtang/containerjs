var Container = require('../src/container');

describe('Container', function() {
	var container;
	var Foo;

	beforeEach(function() {
		container = new Container();
		Foo = function() {};
	});
	
	describe('bind/make', function() {
		it('should bind a type to the container', function() {
			container.bind('foo', function() {
				return new Foo();
			});

			var instance1 = container.make('foo');
			expect(instance1 instanceof Foo).toBeTruthy();

			var instance2 = container.make('foo');
			expect(instance1).not.toBe(instance2);
		});
	});

	describe('singleton', function() {
		it('should bind a single instance to the container', function() {
			container.singleton('foo', function() {
				return new Foo();
			});

			var instance1 = container.make('foo');
			expect(instance1 instanceof Foo).toBeTruthy();

			var instance2 = container.make('foo');
			expect(instance1).toBe(instance2);
		});
	});

	describe('instance', function() {
		it('should bind an existing instance into the container', function() {
			var foo = new Foo();

			container.instance('foo', foo);
			var instance1 = container.make('foo');
			expect(instance1).toBe(foo);
			var instance2 = container.make('foo');
			expect(instance2).toBe(instance1);
		});
	});

	describe('automatic resolution', function() {
		var FooBar;
		var Baz;

		beforeEach(function() {
			Baz = function() {};
			FooBar = function(baz) {
				this.baz = baz;
			};
		});

		it('should resolve classes automatically', function() {
			var foobar = container.make(FooBar);

			expect(foobar instanceof FooBar).toBeTruthy();
			// expect(foobar.baz instanceof Baz).toBeTruthy();
		});

	});

	describe('parseFunctionArgs()', function() {
		it("should return an array of the names of a function's arguments", function() {
			var Foo = function(bar, baz) {};

			var args = container.parseFunctionArgs(Foo);
			expect(args).toEqual(['bar', 'baz']);
		});

		it("should return an empty array if no function arguments", function() {
			var Foo = function() {};

			var args = container.parseFunctionArgs(Foo);
			expect(args).toEqual(null);
		});
	});

});