import React, {Component, Fragment} from 'react'
import {render} from 'react-dom'

import {SimpleComponentRouter} from '../esm/index.js'

const Foo = (props) => <h1>{`Foo: ${props.str}`}</h1>

const Bar = (props) => <h1>Bar</h1>

class Switch extends Component {
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
        <SimpleComponentRouter match={match}>
          <Foo match='foo' str={test} />
          <Bar match='bar' />
        </SimpleComponentRouter>
      </Fragment>
    )
  }
}

const el = document.createElement('el')
document.body.appendChild(el)

render(<Switch />, el)
