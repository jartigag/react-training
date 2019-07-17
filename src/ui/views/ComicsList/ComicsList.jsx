import React from 'react'
import { Text } from 'ui/components/Text'
import styled from 'styled-components'
import { sizes } from 'ui/theme'
import { Button } from 'ui/components/Button'
import { api } from 'api'
import { Select } from 'ui/components/Select'
import isUndefined from 'lodash/isUndefined'

export const ComicsList = () => {
  const [comics, setComics] = React.useState([])
  const [characters, setCharacters] = React.useState([])
  const [firstCharacterFilter, setFirstCharacterFilter] = React.useState(undefined)
  const [secondCharacterFilter, setSecondCharacterFilter] = React.useState(undefined)

  React.useEffect(() => {
    async function fetchCharacters() {
      setCharacters(await api.characters())
    }

    fetchCharacters()
  }, [])

  React.useEffect(() => {
    async function fetchComics() {
      if (isUndefined(firstCharacterFilter) || isUndefined(secondCharacterFilter)) {
        return
      }

      const [firstCharacterComics, secondCharacterComics] = await Promise.all([
        api.comics(firstCharacterFilter),
        api.comics(secondCharacterFilter)
      ])
      const commonComics = firstCharacterComics.filter(comic1 =>
        secondCharacterComics.some(comic2 => comic1.id === comic2.id)
      )

      setComics(commonComics)
    }

    fetchComics()
  }, [firstCharacterFilter, secondCharacterFilter])

  return (
    <Layout>
      <Text as="h1" weight="black" size="h1" marginBottom="small">
        Buscador de cómics de Marvel
      </Text>
      <Text as="p" size="large" marginBottom="large">
        Este buscador encontrará los cómics en los que aparezcan los dos personajes que selecciones en el formulario
      </Text>
      <Text as="p" size="medium" marginBottom="base">
        Selecciona una pareja de personajes
      </Text>
      <Header
        characters={characters}
        firstCharacterFilter={firstCharacterFilter}
        secondCharacterFilter={secondCharacterFilter}
        onChangeFirstCharacter={setFirstCharacterFilter}
        onChangeSecondCharacter={setSecondCharacterFilter}
        onClear={() => {
          setComics([])
          setFirstCharacterFilter(undefined)
          setSecondCharacterFilter(undefined)
        }}
      />
      <List comics={comics} />
      <Footer comicCount={comics.length} />
    </Layout>
  )
}

const Header = ({
  characters,
  firstCharacterFilter,
  secondCharacterFilter,
  onClear,
  onChangeFirstCharacter,
  onChangeSecondCharacter
}) => {
  const options = characters.map(character => ({ value: character.id, label: character.name }))

  return (
    <>
      <CharacterSelect
        options={options}
        value={firstCharacterFilter}
        onSelect={event => onChangeFirstCharacter(event.target.value)}
      />
      <CharacterSelect
        options={options}
        value={secondCharacterFilter}
        onSelect={event => onChangeSecondCharacter(event.target.value)}
      />
      <Button onClick={onClear}>Limpiar búsqueda</Button>
    </>
  )
}

const List = ({ comics }) =>
  comics.map(comic => (
    <Comic key={comic.id}>
      <Text as="p" weight="bold">
        {comic.title}
      </Text>
      <Text as="p">{comic.characters.join(', ')}</Text>
    </Comic>
  ))

const Footer = ({ comicCount }) => (
  <div>
    <Text>Elementos en la lista: {comicCount}</Text>
  </div>
)

const Layout = styled.div`
  max-width: 1140px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
  width: 100%;
`

const CharacterSelect = styled(Select)`
  margin-bottom: ${sizes.base};
  margin-right: ${sizes.large};
`

const Comic = styled.div`
  margin-bottom: ${sizes.base};
`
