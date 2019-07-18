import React from 'react'
import ReactDOM from 'react-dom'
import { Root } from './Root'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from './_components/_context/ThemeContext'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <MemoryRouter>
      <ThemeProvider>
        <Root />
      </ThemeProvider>
    </MemoryRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
