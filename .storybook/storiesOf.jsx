import React from 'react'
import { storiesOf as storiesOfOriginal } from '@storybook/react'
import { GlobalStyles } from '../src/ui/theme'

export const storiesOf = (name, nodeModule) =>
  storiesOfOriginal(name, nodeModule).addDecorator(story => (
    <>
      <GlobalStyles />
      {story()}
    </>
  ))
