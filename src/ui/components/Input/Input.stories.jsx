import React from 'react'
import { storiesOf } from '../../../../.storybook/storiesOf'
import { Input } from './Input'

storiesOf('Input', module)
  .add('default', () => <Input type="text" placeholder="Palabra clave" />)
  .add('disabled', () => <Input disabled type="text" placeholder="Palabra clave" />)
