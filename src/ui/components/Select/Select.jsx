import React from 'react'
import styled from 'styled-components'
import { sizes } from 'ui/theme/size'
import { color } from 'ui/theme/colors'

export const Select = ({ options, value = '', onSelect, className }) => (
  <StyledSelect onChange={onSelect} value={value} className={className}>
    <option value="" />
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </StyledSelect>
)

const StyledSelect = styled.select`
  cursor: pointer;
  width: 200px;
  color: ${color.black1};
  border: 0.5px solid ${color.gray4};
  height: ${sizes.huge};
  background: white;
`
