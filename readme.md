Container
=========

An IoC container class based on the container in Laravel (http://laravel.com/docs/ioc) but implemented in JavaScript for the browser and Node.

## Basic Usage

### Binding A Type Into The Container

```js
var container = new Container();
container.bind('foo', function() {
	return new Foo();
});
```

### Resolving A Type From The Container

```js
var fooInstance = container.make('foo');
```

### Binding A "Shared" Type Into The Container

```js
container.singleton('foo', function() {
	return new Foo();
});
```

### Binding An Existing Instance Into The Container

```js
var foo = new Foo();
container.instance('foo', foo);
```

## Automatic Resolution



## Tests

Install jasmine-node

```
jasmine-node test/ --autotest --watch
```