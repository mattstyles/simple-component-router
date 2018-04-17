
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import invariant from 'invariant'
import {name} from '../package.json'

const log = _ => `[${name}] ${_}`

const INCORRECT_MATCH_TYPES = 'Incorrect parameters'

export function match (route, child) {
  invariant(
    typeof route === 'string' && typeof child === 'string',
    log(INCORRECT_MATCH_TYPES)
  )

  return route === child
}

export class SimpleComponentRouter extends Component {
  render () {
    const {route, children} = this.props
    return React.Children.map(children, child => {
      return this.props.match(route, child.props.match)
        ? child
        : null
    })
  }
}

SimpleComponentRouter.propTypes = {
  route: PropTypes.string.isRequired,
  match: PropTypes.func
}

SimpleComponentRouter.defaultProps = {
  match: match
}
