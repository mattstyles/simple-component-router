
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import invariant from 'invariant'
import {name} from '../package.json'

const append = _ => `[${name}] ${_}`

const INCORRECT_MATCH_TYPES = 'Incorrect parameter types'

export function identity (parent, child) {
  invariant(
    typeof parent === 'string' && typeof child === 'string',
    append(INCORRECT_MATCH_TYPES)
  )

  return parent === child
}

export class SimpleComponentRouter extends Component {
  state = {
    matched: null
  }

  static getDerivedStateFromProps (next, state) {
    console.log('getting derived state')
    const {match, matchFunc, children} = next
    return {
      ...state,
      matched: React.Children.map(children, child => {
        return matchFunc(match, child.props.match)
          ? child
          : null
      })
    }
  }

  render () {
    return this.state.matched
  }
}

SimpleComponentRouter.propTypes = {
  match: PropTypes.string.isRequired,
  matchFunc: PropTypes.func,
  superMatchFunc: PropTypes.func
}

SimpleComponentRouter.defaultProps = {
  matchFunc: identity
}
