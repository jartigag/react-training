import styled from 'styled-components'
import { sizes, color, font } from 'ui/theme'

export const Input = styled.input`
  ${font.sizes.nav()}
  min-width: ${sizes.baseScale(36)};
  color: ${color.black1};
  border: 0.5px solid ${color.gray4};
  padding: ${sizes.medium};

  &:hover {
    cursor: pointer;
  }

  &:focus,
  &:active {
    outline: none;
    border: 0.5px solid ${color.blue3};
  }

  &::placeholder {
    color: ${color.black3};
  }

  &:disabled {
    border: 0.5px solid ${color.gray4};
    color: ${color.black3};
    opacity: 0.5;
  }

  &:disabled:hover {
    cursor: not-allowed;
  }
`
