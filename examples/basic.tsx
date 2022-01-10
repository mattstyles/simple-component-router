import React, {Component, Fragment} from 'react'
import {render} from 'react-dom'

import type {RouteProps} from '../lib/index'
import {TinyComponentRouter} from '../lib/index'

/**
 * Basic usage is to supply a string to the router match prop, and strings to each child match prop. Router will do the rest.
 */

const Foo = (_: RouteProps) => <h1>Foo</h1>

const Bar = (_: RouteProps) => <h1>Bar</h1>

class Switch extends Component<{}, {match: string}> {
  state = {
    match: 'foo',
  }

  onClick = () => {
    this.setState((state) => ({
      ...state,
      match: state.match === 'foo' ? 'bar' : 'foo',
    }))
  }

  render() {
    const {match} = this.state

    return (
      <Fragment>
        <button onClick={this.onClick}>Toggle</button>
        <TinyComponentRouter match={match}>
          <Foo match='foo' />
          <Bar match='bar' />
        </TinyComponentRouter>
      </Fragment>
    )
  }
}

const el = document.createElement('div')
document.body.appendChild(el)

render(<Switch />, el)
