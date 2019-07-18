import React from 'react'
import { color } from 'ui/theme/colors'
import styled from 'styled-components'
import { Text } from 'ui/components/Text'
import { lighten, darken } from 'polished'

const ErrorRaw = ({ className, children, ...rest }) => (
  <div className={className} {...rest}>
    <Text color={darken(0.15, color.red)}>{children}</Text>
  </div>
)

export const Error = styled(ErrorRaw)`
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  background-color: ${lighten(0.2, color.red)};
  border: 1px solid ${color.red};
  border-radius: 0.25rem;
`
