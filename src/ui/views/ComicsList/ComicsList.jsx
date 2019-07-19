import React from 'react'
import { Text } from 'ui/components/Text'
import styled from 'styled-components'
import { ComicService } from 'core/services/Comic'
import { CharacterService } from 'core/services/Character'
import { Header } from './_components/Header/Header'
import { List } from './_components/List/List'
import { Footer } from './_components/Footer/Footer'
import isUndefined from 'lodash/isUndefined'
import { Error } from 'ui/components/Error/Error'
import { color } from 'ui/theme'
import { Loading } from 'ui/components/Loading'
import { Button } from 'ui/components/Button'
import { UserService } from 'core/services/User'
import { navigator } from 'core/infrastructure/navigation/navigator'
import { ThemeService } from 'core/services/Theme'
import { ThemeContext } from 'ui/views/_components/_context/ThemeContext'

export const ComicsList = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const { firstCharacterFilter, secondCharacterFilter, error, loading, comics } = state
  const [characters, setCharacters] = React.useState([])
  const onLogout = async () => {
    await UserService.logout()
    navigator.goToLogin()
  }
  const theme = React.useContext(ThemeContext)
  const onThemeModeToggle = async () => ThemeService.toggleMode(theme.getMode() === 'DAY' ? 'NIGHT' : 'DAY')

  React.useEffect(() => {
    async function fetchCharacters() {
      setCharacters(await CharacterService.all())
    }

    fetchCharacters()
  }, [])

  React.useEffect(() => {
    async function fetchComics() {
      if (isUndefined(firstCharacterFilter) || isUndefined(secondCharacterFilter)) {
        return
      }

      try {
        dispatch({ type: 'FETCH_COMICS' })
        dispatch({
          type: 'SHOW_COMICS',
          comics: await ComicService.common(firstCharacterFilter, secondCharacterFilter)
        })
      } catch (error) {
        if (error.status === 404) {
          dispatch({ type: 'SHOW_ERROR', error: 'No existe ningún comic para este personaje 😱' })
        }
        if (error.status === 500) {
          dispatch({ type: 'SHOW_ERROR', error: 'Vuelve a intentarlo más tarde... 🤕' })
        }
      }
    }

    fetchComics()
  }, [firstCharacterFilter, secondCharacterFilter])

  const renderList = () => {
    if (!isUndefined(error)) {
      return <Error>{error}</Error>
    }

    if (loading) {
      return <Loading color={color.blue1} />
    }

    return <List comics={comics} />
  }

  return (
    <Layout>
      <Button onClick={onLogout} marginRight="medium">
        Cerrar Sesión
      </Button>
      <input type="checkbox" onClick={onThemeModeToggle} />
      <Text as="span" marginBottom="small" marginRight="small">
        El tema actual es: {theme.getMode() === 'DAY' ? 'modo día' : 'modo noche'}
      </Text>
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
        onChangeFirstCharacter={filter => dispatch({ type: 'SELECT_FIRST_CHARACTER', filter })}
        onChangeSecondCharacter={filter => dispatch({ type: 'SELECT_SECOND_CHARACTER', filter })}
        onClear={() => dispatch({ type: 'CLEAR' })}
      />
      {renderList()}
      <Footer comicCount={comics.length} />
    </Layout>
  )
}

const initialState = {
  comics: [],
  firstCharacterFilter: undefined,
  secondCharacterFilter: undefined,
  loading: false,
  error: undefined
}

function reducer(state, action) {
  switch (action.type) {
    case 'SELECT_FIRST_CHARACTER':
      return {
        ...state,
        firstCharacterFilter: action.filter
      }
    case 'SELECT_SECOND_CHARACTER':
      return {
        ...state,
        secondCharacterFilter: action.filter
      }
    case 'FETCH_COMICS':
      return {
        ...state,
        comics: [],
        loading: true,
        error: undefined
      }
    case 'SHOW_COMICS':
      return {
        ...state,
        comics: action.comics,
        loading: false,
        error: undefined
      }
    case 'SHOW_ERROR':
      return {
        ...state,
        comics: [],
        loading: false,
        error: action.error
      }
    case 'CLEAR':
      return initialState
    default:
      throw new Error(`Unhandled action type: ${action.type}. Please fix it. Thank you.`)
  }
}

const Layout = styled.div`
  max-width: 1140px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
  width: 100%;
`
