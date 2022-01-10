import * as React from 'react'
import {Component, Fragment} from 'react'
import {render} from 'react-dom'

import type {RouteProps} from '../lib/index'
import {TinyComponentRouter} from '../lib/index'
// import {TinyComponentRouter} from '../src/index.tsx'

/**
 * Example showing extra properties attached to children of the Router.
 */

interface FooProps extends RouteProps {
  str: string
}
const Foo = (props: FooProps) => <h1>{`Foo: ${props.str}`}</h1>

const Bar = (_: RouteProps) => <h1>Bar</h1>

class Switch extends Component<{}, {match: string; test: string}> {
  state = {
    match: 'foo',
    test: 'foo',
  }

  onClick = () => {
    this.setState((state) => ({
      ...state,
      match: state.match === 'foo' ? 'bar' : 'foo',
    }))
  }

  onClickTwo = () => {
    this.setState((state) => ({
      ...state,
      test: state.test === 'foo' ? 'bar' : 'foo',
    }))
  }

  render() {
    const {match, test} = this.state

    return (
      <Fragment>
        <button onClick={this.onClick}>Toggle</button>
        <button onClick={this.onClickTwo}>Another</button>
        <TinyComponentRouter match={match}>
          <Foo match='foo' str={test} />
          <Bar match='bar' />
        </TinyComponentRouter>
      </Fragment>
    )
  }
}

const el = document.createElement('div')
document.body.appendChild(el)

render(<Switch />, el)
