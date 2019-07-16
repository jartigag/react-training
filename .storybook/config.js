import * as React from 'react'
import { configure } from '@storybook/react'

const req = require.context('../', true, /.stories.jsx$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
