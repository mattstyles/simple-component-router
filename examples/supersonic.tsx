import * as React from 'react'
import {useState} from 'react'
import {render} from 'react-dom'

import type {RouteProps} from '../src/index'
import {TinyComponentRouter} from '../src/index'

/**
 * Supersonic mode disables re-rendering when the match prop does not change.
 * This means that when there is no change in route that no rendering happens,
 * which is fast, but, it also means that other things that rely on that
 * rendering won’t happen either.
 */

const Foo = (_: RouteProps) => {
  return (
    <>
      <h1>Page A</h1>
      <p>Contains inner state, which will change.</p>
      <TextUpdate yes='😃' no='😢' />
    </>
  )
}
interface BarProps extends RouteProps {
  text: string
}
const Bar = ({text}: BarProps) => {
  return (
    <>
      <h1>Page B</h1>
      <p>Contains state passed from outside, will not update.</p>
      <p>Try changing routes back to this route though...</p>
      <h1>{text}</h1>
    </>
  )
}

class Switch extends React.Component<{}, {match: string; text: string}> {
  state = {
    match: 'foo',
    text: '🥳',
  }

  onClick = () => {
    this.setState((state) => ({
      ...state,
      match: state.match === 'foo' ? 'bar' : 'foo',
    }))
  }

  onTextClick = () => {
    this.setState((state) => ({
      ...state,
      text: state.text === '🥳' ? '🤯' : '🥳',
    }))
  }

  render() {
    const {match} = this.state

    return (
      <>
        <button onClick={this.onClick}>Toggle Route</button>
        <button onClick={this.onTextClick}>Toggle Text for Page B</button>
        <TinyComponentRouter match={match} supersonic>
          <Foo match='foo' />
          <Bar match='bar' text={this.state.text} />
        </TinyComponentRouter>
      </>
    )
  }
}

function TextUpdate({yes, no}: {yes: string; no: string}) {
  const [toggle, setToggle] = useState(false)
  return (
    <>
      <h1>{toggle ? yes : no}</h1>
      <button onClick={() => setToggle(!toggle)}>Inner State</button>
    </>
  )
}

const el = document.createElement('div')
document.body.appendChild(el)

render(<Switch />, el)
