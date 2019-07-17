import React from 'react'
import { Text } from 'ui/components/Text'
import styled from 'styled-components'
import { ComicService } from 'core/services/Comic'
import { CharacterService } from 'core/services/Character'
import { Header } from './_components/Header/Header'
import { List } from './_components/List/List'
import { Footer } from './_components/Footer/Footer'

export const ComicsList = () => {
  const [comics, setComics] = React.useState([])
  const [characters, setCharacters] = React.useState([])
  const [firstCharacterFilter, setFirstCharacterFilter] = React.useState(undefined)
  const [secondCharacterFilter, setSecondCharacterFilter] = React.useState(undefined)

  React.useEffect(() => {
    async function fetchCharacters() {
      setCharacters(await CharacterService.all())
    }

    fetchCharacters()
  }, [])

  React.useEffect(() => {
    async function fetchComics() {
      setComics(await ComicService.common(firstCharacterFilter, secondCharacterFilter))
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

const Layout = styled.div`
  max-width: 1140px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
  width: 100%;
`
