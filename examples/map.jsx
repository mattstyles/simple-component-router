import React, {Component, Fragment} from 'react'
import {render} from 'react-dom'

import {TinyComponentRouter} from '../esm/index.js'

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

const Foo = (props) => <h1>Foo</h1>

const Bar = (props) => <h1>Bar</h1>

/**
 * Maps over children wrapping them in a view component.
 * This can be essential for animating transitions.
 */
const map = (props) => {
  const {match, matchFunc} = props
  return (child) => {
    return matchFunc(match, child.props.match) ? <View>{child}</View> : null
  }
}

/**
 * Custom match function which knows how to translate the state object passed
 * to it and return a boolean to denote a match or not.
 */
const match = (state, route) => {
  if (!state || !state.route) {
    return false
  }

  return state.route === route
}

class Switch extends Component {
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
        <TinyComponentRouter match={this.state} matchFunc={match} mapFunc={map}>
          <Foo match='foo' />
          <Bar match='bar' />
        </TinyComponentRouter>
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
