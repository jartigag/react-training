import React from 'react'
import { storiesOf as storiesOfOriginal } from '@storybook/react'
import { GlobalStyles } from '../src/ui/theme'
import { withKnobs } from '@storybook/addon-knobs'

export const storiesOf = (name, nodeModule) =>
  storiesOfOriginal(name, nodeModule)
    .addDecorator(withKnobs)
    .addDecorator(story => (
      <>
        <GlobalStyles />
        {story()}
      </>
    ))
