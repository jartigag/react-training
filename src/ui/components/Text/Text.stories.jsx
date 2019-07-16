import React from 'react'
import { storiesOf } from '../../../../.storybook/storiesOf'
import { Text } from './Text'

storiesOf('Text', module)
  .add('default', () => <Text>Some text</Text>)
  .add('uppercase', () => <Text uppercase>uppercase</Text>)
  .add('color', () => <Text color="green">black3</Text>)
  .add('weight', () => (
    <>
      <Text weight="regular">regular</Text>
      <br />
      <Text weight="bold">bold</Text>
      <br />
      <Text weight="black">black</Text>
    </>
  ))
  .add('alignment', () => (
    <>
      <Text as="p" textAlign="left">
        left
      </Text>
      <Text as="p" textAlign="center">
        center
      </Text>
      <Text as="p" textAlign="right">
        right
      </Text>
    </>
  ))
  .add('sizes', () => (
    <>
      <Text size="tiny">Tiny</Text>
      <br />
      <Text size="small">Small</Text>
      <br />
      <Text size="base">Base</Text>
      <br />
      <Text size="large">Large</Text>
      <br />
      <Text size="medium">Medium</Text>
      <br />
      <Text size="nav">Nav</Text>
      <br />
      <Text size="h1">h1</Text>
      <br />
      <Text size="button">button</Text>
      <br />
      <Text size="buttonSmall">buttonSmall</Text>
    </>
  ))
