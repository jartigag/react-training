import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { Root } from 'ui/views'
import { Router } from 'react-router-dom'
import { history } from 'core/infrastructure/navigation/history'

ReactDOM.render(
  <Router history={history}>
    <Root />
  </Router>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
