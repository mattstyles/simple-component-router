import * as React from 'react'
import invariant from 'tiny-invariant'

const name = 'tiny-component-router'
const append = (_) => `[${name}] ${_}`

const INCORRECT_MATCH_TYPES = 'Incorrect parameter types'

export function equality(parent, child) {
  invariant(
    typeof parent === 'string' && typeof child === 'string',
    append(INCORRECT_MATCH_TYPES)
  )

  return parent === child
}

const mapFunc = (props) => {
  const {match, matchFunc} = props
  return (child) => (matchFunc(match, child.props.match) ? child : null)
}

export class TinyComponentRouter extends React.Component {
  state = {
    matched: null,
  }

  static getDerivedStateFromProps(next, state) {
    const {match, mapFunc, children, supersonic} = next
    const {previousMatch} = state

    if (supersonic && match === previousMatch) {
      return null
    }

    return {
      ...state,
      previousMatch: match,
      matched: React.Children.map(children, mapFunc(next)),
    }
  }

  render() {
    return this.state.matched
  }
}

// SimpleComponentRouter.propTypes = {
//   match: PropTypes.any.isRequired,
//   matchFunc: PropTypes.func,
//   mapFunc: PropTypes.func,
//   supersonic: PropTypes.bool,
// }
//
// SimpleComponentRouter.defaultProps = {
//   matchFunc: equality,
//   mapFunc: mapFunc,
//   supersonic: false,
// }
