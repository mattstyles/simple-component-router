# Tiny Component Router

> Matching on children should be easy

[![npm](https://img.shields.io/npm/v/tiny-component-router.svg?style=flat)](https://www.npmjs.com/package/tiny-component-router)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/mattstyles/tiny-component-router.svg)](https://david-dm.org/mattstyles/tiny-component-router)

## Getting Started

Install via [npm](https://npmjs.com)

```sh
npm i -S tiny-component-router
```

The simplest thing to match upon is a string, lets try that,

```js
import {TinyComponentRouter} from 'tiny-component-router'
import {render} from 'react-dom'

render(
  <TinyComponentRouter match='foo'>
    <h1 match='foo'>I am visible</h1>
    <h1 match='bar'>I am not</h1>
  </TinyComponentRouter>,
  document.getElementById('main')
)
```

Pretty handy for full blown route matching, feature flag toggling, a/b testing of components, and whatever else you can think of.

> Note that `tiny-component-router` has a peer dependency on `>= React@16.8` due to the use of `getDerivedStateFromProps`. This is specified in the `package.json` but worth calling out explicitly.

## Caching and Supersonic mode

`Simple-component-router` is not only simple, it is fairly lazy and can be coerced into even greater levels of laziness by use of the `supersonic` flag:

```js
<TinyComponentRouter match='foo' supersonic>
  ...
</TinyComponentRouter>
```

`Supersonic` lets `simple-component-router` know that the only changing prop it should care about is the match key, if anything else changes it won’t do anything! No work is the fastest work there is!

Ideally `supersonic` would be the default but as children, and, importantly, their props, are cached when the component updates `supersonic` mode nukes any possibility of passing props through to children.

If you supply props to child components _without_ passing it through your router (context, redux-style connect functions, `setState` and container components, etc etc) then `supersonic` could very well be the flag you want.

## Not in Kansas anymore

So, simple isn’t good enough for you? You want less simple?

`Tiny-component-router` uses two primary functions for plucking children out to be rendered, the inventively named `mapFunc` and `matchFunc`.

The `mapFunc` is an iterator over the `Children` structure, it’s default being to pass the child’s `match` prop to the `matchFunc` and then spit out the child components as it finds them. To have full-blown route matching capability (stuff like exploding globs in path names and supplying them as props to children) you’ll want to customise this function, perhaps by adding props to the children or wrapping them in a HOC.

The `matchFunc` is a far simpler affair and, by default, expects two strings to match against using strict (`===`) equality. It’s parameters are defined by the `mapFunc` so you have full control over how you want to match on children, but, if you go with the default `mapFunc` you can expect this function to be supplied with the parent `match` prop and the current iterated child `match` prop.

This all sounds far more complex than it actually is.

Check the code, it’s only 50 or so lines of goodness (and most of that is whitespace) and will show the relationship between `mapFunc` and `matchFunc`.

## API

### match `<any>` `isRequired`

```js
const Router = ({route}) => (
  <TinyComponentRouter match={route}>
    <h1 match='foo'>I am visible</h1>
    <h1 match='bar'>I am not</h1>
  </TinyComponentRouter>
)
```

The `match` prop supplied to `TinyComponentRouter` is the value that will be matched against. By default the functions used end up performing a strict (`===`) equality check of this value against child `match` props and rendering those children who match up.

### supersonic `<boolean>`

Setting to true ups how aggressively the list of matched children is cached.

In reality this usually means that the only way to get the component to update is to change the `match` prop.

Note that setting `supersonic` will stop changing of other props being propagated to children.

### matchFunc `(<any>, <any>) => <boolean>`

The `matchFunc` makes a decision on whether a child gets rendered or ditched. It takes the `match` prop from `TinyComponentRouter` and the `match` prop from the currently iterated child component.

By default this uses strict equality (`===`) to make a decision so you could supply strings, numbers or even booleans (very useful for feature flag toggling or a/b testing).

### mapFunc `(props <object>) => (child <ReactComponent|Function>) => <ReactComponent|Function>)`

The `mapFunc` is used as an iterator over the `Children` object, being passed the entire `child` each step.

It’s first form will be passed the current `TinyComponentRouter` props, the returned function is the expected iterator.

Customisation of the `mapFunc` allows `TinyComponentRouter` to exhibit more complex behaviours, making it more appropriate to use as a full-blown application router.

## Running tests

```sh
$ npm i
$ npm test
```

## Contributing

Pull requests are always welcome, the project uses the [standard](http://standardjs.com) code style. Please run `npm test` to ensure all tests are passing and add tests for any new features or updates.

For bugs and feature requests, [please create an issue](https://github.com/mattstyles/simple-component-router/issues).

## License

MIT
