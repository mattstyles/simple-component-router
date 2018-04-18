
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import invariant from 'invariant'
import {name} from '../package.json'

const append = _ => `[${name}] ${_}`

const INCORRECT_MATCH_TYPES = 'Incorrect parameter types'

export function equality (parent, child) {
  invariant(
    typeof parent === 'string' && typeof child === 'string',
    append(INCORRECT_MATCH_TYPES)
  )

  return parent === child
}

const mapFunc = props => {
  const {match, matchFunc} = props
  return child => matchFunc(match, child.props.match)
    ? child
    : null
}

export class SimpleComponentRouter extends Component {
  state = {
    matched: null
  }

  static getDerivedStateFromProps (next, state) {
    const {match, mapFunc, children, supersonic} = next
    const {previousMatch} = state

    if (supersonic && match === previousMatch) {
      return null
    }

    return {
      ...state,
      previousMatch: match,
      matched: React.Children.map(children, mapFunc(next))
    }
  }

  render () {
    return this.state.matched
  }
}

SimpleComponentRouter.propTypes = {
  match: PropTypes.string.isRequired,
  matchFunc: PropTypes.func,
  mapFunc: PropTypes.func,
  supersonic: PropTypes.bool
}

SimpleComponentRouter.defaultProps = {
  matchFunc: equality,
  mapFunc: mapFunc,
  supersonic: false
}
