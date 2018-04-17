
import React, {Component, Fragment} from 'react'
import {render} from 'react-dom'

import {SimpleComponentRouter} from '../src/index.jsx'

const Foo = props => (
  <h1>Foo</h1>
)

const Bar = props => (
  <h1>Bar</h1>
)

class Switch extends Component {
  state = {
    route: 'foo'
  }

  onClick = () => {
    this.setState(state => ({
      ...state,
      route: state.route === 'foo' ? 'bar' : 'foo'
    }))
  }

  render () {
    const {route} = this.state

    return (
      <Fragment>
        <button onClick={this.onClick}>Toggle</button>
        <SimpleComponentRouter route={route}>
          <Foo match='foo' />
          <Bar match='bar' />
        </SimpleComponentRouter>
      </Fragment>
    )
  }
}

const el = document.createElement('el')
document.body.appendChild(el)

render(
  <Switch />,
  el
)
