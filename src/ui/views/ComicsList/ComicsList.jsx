import React, { useState, useEffect } from 'react'
import { Text } from 'ui/components/Text'
import { Button } from 'ui/components/Button'
import { Select } from 'ui/components/Select'
import styled from 'styled-components'
import { sizes } from '../../theme'
import { api } from 'api'

export const ComicsList = () => {

  const [characters, setCharacters] = useState([])
  const mappedCharacters = characters.map(character => ({ value: character.id, label: character.name }))

  useEffect(() => {
    api.characters()
      .then(data => {
        setCharacters(data); // set characters in state
      });
  }, [])

  const [firstSelectedChar, setFirstSelectedChar] = useState('')
  const [secondSelectedChar, setSecondSelectedChar] = useState('')
  const [comics, setComics] = useState([]);
  const getCommonComics = async(firstSelectedChar, secondSelectedChar) => {
    const [firstCharComics, secondCharComics] = await Promise.all([
      api.comics(firstSelectedChar),
      api.comics(secondSelectedChar)
    ])

    const commonComics = firstCharComics.filter(
      comic1 => secondCharComics.some(comic2 => comic1.id === comic2.id)
    )

    return commonComics
  }

  useEffect(() => {
    getCommonComics(firstSelectedChar, secondSelectedChar)
      .then(data => {
        setComics(data); // set comics in state
      });
  }, [firstSelectedChar, secondSelectedChar])

  const clearSelectedChars = () => {
    setFirstSelectedChar('')
    setSecondSelectedChar('')
    setComics([])
  }

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
      <Header characters={mappedCharacters} onClear={clearSelectedChars}
        firstSelectedChar={firstSelectedChar} setFirstSelectedChar={setFirstSelectedChar}
        secondSelectedChar={secondSelectedChar} setSecondSelectedChar={setSecondSelectedChar} />
      <List comics={comics} />
      <Footer comicCount={comics.length} />
    </Layout>
  )
}

const Header = ({ characters, onClear, firstSelectedChar, setFirstSelectedChar, secondSelectedChar, setSecondSelectedChar }) => (
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

const Comic = styled.div`
  margin-bottom: ${sizes.base};
`
