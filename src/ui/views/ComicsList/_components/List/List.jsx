import React from 'react'
import { Text } from 'ui/components/Text'
import styled from 'styled-components'
import { sizes } from 'ui/theme'

export const List = ({ comics }) =>
  comics.map(comic => (
    <Comic key={comic.getId()} data-testid="comic-item">
      <Text as="p" weight="bold">
        {comic.getTitle()}
      </Text>
      <Text as="p">{comic.getCharacters().join(', ')}</Text>
    </Comic>
  ))

const Comic = styled.div`
  margin-bottom: ${sizes.base};
`
