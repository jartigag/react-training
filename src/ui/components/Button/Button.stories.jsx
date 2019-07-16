import React from 'react'
import { storiesOf } from '../../../../.storybook/storiesOf'
import { Button } from './Button'
import { action } from '@storybook/addon-actions'

storiesOf('Button', module)
  .add('default', () => <Button>Some text</Button>)
  .add('secondary', () => <Button secondary>Some text</Button>)
  .add('click', () => <Button onClick={action('Button Click')}>Some text</Button>)
