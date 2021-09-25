import React, { useState, useEffect } from 'react'
import { Text } from 'ui/components/Text'
import { Input } from 'ui/components/Input'
import { Button } from 'ui/components/Button'
import { Select } from 'ui/components/Select'
import styled from 'styled-components'
import { sizes } from '../../theme'
import { api } from 'api'

/*const comics = [
  {
    id: 45977,
    title: 'Captain America (2012) #11',
    characters: ['Captain America']
  },
  {
    id: 43722,
    title: 'Captain America (2012) #1',
    characters: ['Captain America']
  },
  {
    id: 40391,
    title: 'Captain America (2011) #18',
    characters: ['Captain America']
  },
  {
    id: 43339,
    title: 'Uncanny Avengers (2012) #1',
    characters: ['Captain America', 'Havok', 'Rogue', 'Scarlet Witch', 'Thor', 'Wolverine']
  }
]*/


export const ComicsList = () => {

  const [characters, setCharacters] = useState([]);
  const mappedCharacters = characters.map(character => ({ value: character.id, label: character.name }))

  useEffect(() => {
    api.characters()
      .then(data => {
        setCharacters(data); // set characters in state
      });
  }, []);

  const [firstSelectedChar, setFirstSelectedChar] = useState('')
  const [secondSelectedChar, setSecondSelectedChar] = useState('')

  const [comics, setComics] = useState([]);
  const commonComics = firstCharacterComics.filter(
    comic1 => secondCharacterComics.some(comic2 => comic1.id === comic2.id)
  )

  useEffect(() => {
    api.allComics()
      .then(data => {
        setComics(data); // set comics in state
      });
  }, [firstSelectedChar, secondSelectedChar]);

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
      <Header characters={mappedCharacters} onFilter={() => ('')} onClear={() => ('')}
        firstSelectedChar={firstSelectedChar} setFirstSelectedChar={setFirstSelectedChar}
        secondSelectedChar={secondSelectedChar} setSecondSelectedChar={setSecondSelectedChar} />
      <List comics={commonComics} /> {/* WIP: commonComics */}
      <Footer comicCount={commonComics.length} />
    </Layout>
  )
}

const Header = ({ characters, onFilter, onClear, firstSelectedChar, setFirstSelectedChar, secondSelectedChar, setSecondSelectedChar }) => (
  <>
  <Select options={characters} onSelect={event => setFirstSelectedChar(event.target.value)} value={firstSelectedChar}></Select>
  <Select options={characters} onSelect={event => setSecondSelectedChar(event.target.value)} value={secondSelectedChar}></Select>
    <Button marginLeft="base" onClick={onClear}>
      Limpiar búsqueda
    </Button>
  </>
)

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

const ComicInput = styled(Input)`
  margin-bottom: ${sizes.base};
`

const Comic = styled.div`
  margin-bottom: ${sizes.base};
`
