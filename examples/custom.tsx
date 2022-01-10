import * as React from 'react'
import {Component, Fragment} from 'react'
import {render} from 'react-dom'

// import type {RouteProps, RouterProps, Route} from '../lib/index'
// import {TinyComponentRouter} from '../lib/index'
import type {RouteProps, RouterProps, Route} from '../src/index'
import {TinyComponentRouter} from '../src/index'

/**
 * You can supply the mapping and matching functions.
 * This example requires a custom matcher as the match passed to the router describes an object and not a plain string (this may very well happen if you implement path globbing).
 * This example also implements a custom route mapping function which works like a HOC for routes.
 *
 * TinyComponentRouter exposes type generics to allow customisation, although it requires a small amount of typescript gymnastics to get working.
 * Router accepts T and U generics, where T is the matching type for the router, and U is for the routes. These generics define the custom mapping and matching functions.
 */

const Style = () => (
  <style>{`
    .view {
      padding: 30px;
      background: #f4f6fa;
    }
    button {
      margin: 30px;
      padding: 3px 18px;
    }
  `}</style>
)

const View = ({children}) => <div className='view'>{children}</div>

const Foo = (_: RouteProps) => <h1>Foo</h1>
const Bar = (_: RouteProps) => <h1>Bar</h1>

/**
 * Maps over children wrapping them in a view component.
 * This can be essential for animating transitions.
 */
const map = (props: RouterProps<StateRoute>) => {
  const {match, matchFunc} = props
  return (child: Route) => {
    return matchFunc(match, child.props.match) ? <View>{child}</View> : null
  }
}

/**
 * Custom match function which knows how to translate the state object passed
 * to it and return a boolean to denote a match or not.
 */
const match = (state: StateRoute, route: string) => {
  if (!state || !state.route) {
    return false
  }

  return state.route === route
}

type StateRoute = {route: string}
class Router extends TinyComponentRouter<StateRoute> {}

class Switch extends Component<{}, {route: string}> {
  state = {
    route: 'foo',
  }

  onClick = () => {
    this.setState((state) => ({
      ...state,
      route: state.route === 'foo' ? 'bar' : 'foo',
    }))
  }

  render() {
    return (
      <Fragment>
        <button onClick={this.onClick}>Toggle</button>
        <Router match={this.state} matchFunc={match} mapFunc={map}>
          <Foo match='foo' />
          <Bar match='bar' />
        </Router>
      </Fragment>
    )
  }
}

const el = document.createElement('div')
document.body.appendChild(el)

render(
  <Fragment>
    <Style />
    <Switch />
  </Fragment>,
  el
)
