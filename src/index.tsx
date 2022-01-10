import * as React from 'react'
import invariant from 'tiny-invariant'

const name = 'tiny-component-router'
const append = (_: string) => `[${name}] ${_}`

const INCORRECT_MATCH_TYPES = 'Incorrect parameter types'

export function equality(parent: string, child: string) {
  invariant(
    typeof parent === 'string' && typeof child === 'string',
    append(INCORRECT_MATCH_TYPES)
  )

  return parent === child
}

const defaultMapFunc = (props: RouterProps) => {
  const {match, matchFunc = equality} = props
  return (child: Route) => (matchFunc(match, child.props.match) ? child : null)
}

export interface RouteProps<T = string> {
  match: T
  [others: string]: any
}
export type Route<T = string> = React.ReactElement<RouteProps<T>, any>
export interface RouterProps<T = string, R = string> {
  match: T
  matchFunc?: (a: T, b: R) => boolean
  mapFunc?: (props: RouterProps<T>) => (child: Route) => React.ReactNode
  supersonic?: boolean
  children: Route[]
}
export interface RouterState<T = string> {
  matched: Route<T>
  previousMatch: string | null
}
export class TinyComponentRouter<
  T = string,
  U = string
> extends React.Component<RouterProps<T, U>, RouterState<T>> {
  state = {
    matched: null,
    previousMatch: null,
  }

  static getDerivedStateFromProps(next: RouterProps, state: RouterState) {
    const {match, mapFunc = defaultMapFunc, children, supersonic = false} = next
    const {previousMatch} = state

    if (supersonic && match === previousMatch) {
      return null
    }

    return {
      previousMatch: match,
      matched: React.Children.map(children, mapFunc(next)),
    }
  }

  render() {
    return this.state.matched
  }
}
