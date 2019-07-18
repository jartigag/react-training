import React from 'react'
import { alignmentCss, color as colorList, font, marginsCss } from 'ui/theme'
import styled, { css } from 'styled-components'
import isUndefined from 'lodash/isUndefined'
import { ThemeContext } from 'ui/views/_components/_context/ThemeContext'

const TextRaw = ({ as: As = 'span', children, className, title }) => (
  <As className={className} title={title}>
    {children}
  </As>
)

const StyledText = styled(TextRaw)`
  ${marginsCss}
  ${alignmentCss}

  ${p =>
    p.color &&
    css`
      color: ${colorList[p.color]};
    `}

  ${p =>
    p.uppercase &&
    css`
      text-transform: uppercase;
    `}

  ${p => p.size === 'tiny' && font.sizes.tiny()}
  ${p => p.size === 'small' && font.sizes.small()}
  ${p => p.size === 'large' && font.sizes.large()}
  ${p => p.size === 'medium' && font.sizes.medium()}
  ${p => p.size === 'nav' && font.sizes.nav()}
  ${p => p.size === 'h1' && font.sizes.h1()}
  ${p => p.size === 'base' && font.sizes.base()}
  ${p => p.size === 'button' && font.sizes.button()}
  ${p => p.size === 'buttonSmall' && font.sizes.buttonSmall()}
  ${p => isUndefined(p.size) && font.sizes.base()}

  ${p =>
    p.weight === 'bold' &&
    css`
      font-weight: ${font.weight.bold};
    `}
  ${p =>
    p.weight === 'black' &&
    css`
      font-weight: ${font.weight.black};
    `}
  ${p =>
    p.weight === 'regular' &&
    css`
      font-weight: ${font.weight.regular};
    `}
  ${p =>
    isUndefined(p.weight) &&
    css`
      font-weight: ${font.weight.regular};
    `}
`

export const Text = ({ color, ...rest }) => {
  const theme = React.useContext(ThemeContext)
  return <StyledText {...rest} color={theme.getMode() === 'DAY' ? 'black1' : 'white'} />
}
