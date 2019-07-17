import React from 'react'
import { storiesOf } from '../../../../.storybook/storiesOf'
import { Select } from './Select'
import { action } from '@storybook/addon-actions'

const options = [{ value: 'chocolate', label: 'Chocolate' }, { value: 'strawberry', label: 'Strawberry' }]

storiesOf('Select', module)
  .add('default', () => <Select onSelect={action('select')} options={options} />)
  .add('selected option', () => <Select value={options[0]} onSelect={action('select')} options={options} />)
