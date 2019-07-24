import { cleanup, fireEvent, render, wait } from '@testing-library/react'
import { Router } from 'react-router-dom'
import React from 'react'
import { ThemeProvider } from 'ui/views/_components/_context/ThemeContext'
import { CharacterService } from 'core/services/Character'
import { aCharacterCollection } from 'core/domain/model/__builders__/CharacterBuilder'
import { ThemeService } from 'core/services/Theme'
import { ComicService } from 'core/services/Comic'
import { aComicCollection } from 'core/domain/model/__builders__/ComicBuilder'
import { createMemoryHistory } from 'history'
import { Root } from 'ui/views/Root'
import { routes } from 'ui/routes'
import { userStorage } from 'core/domain/model/User/UserStorage'
import { UserService } from 'core/services/User'
import { navigator } from 'core/infrastructure/navigation/navigator'

describe('ComicsList', () => {
  beforeEach(() => {
    jest.spyOn(userStorage, 'hasToken').mockReturnValue(true)
  })

  afterEach(() => {
    cleanup()
    jest.resetAllMocks()
  })

  it('shows loading', async () => {
    const characters = aCharacterCollection()
    jest.spyOn(CharacterService, 'all').mockResolvedValue(characters)
    jest.spyOn(ThemeService, 'toggleMode').mockResolvedValue(undefined)
    const { findByTestId } = renderWithRouter(
      <ThemeProvider>
        <Root />
      </ThemeProvider>,
      { route: routes.COMICS }
    )

    const selectFirstCharacter = await findByTestId('select-first-character')
    fireEvent.change(selectFirstCharacter, { target: { value: characters[0].getId() } })

    const selectSecondCharacter = await findByTestId('select-second-character')
    fireEvent.change(selectSecondCharacter, { target: { value: characters[1].getId() } })

    const loading = await findByTestId('comic-list-loading')
    expect(loading).toBeDefined()
  })

  it('shows error for a character without comic', async () => {
    const characters = aCharacterCollection()
    jest.spyOn(CharacterService, 'all').mockResolvedValue(characters)
    jest.spyOn(ThemeService, 'toggleMode').mockResolvedValue(undefined)
    const error = {
      ...new Error('error'),
      status: 404,
      response: new Response()
    }
    jest.spyOn(ComicService, 'common').mockRejectedValue(error)
    const { findByText, findByTestId } = renderWithRouter(
      <ThemeProvider>
        <Root />
      </ThemeProvider>,
      { route: routes.COMICS }
    )

    const selectFirstCharacter = await findByTestId('select-first-character')
    fireEvent.change(selectFirstCharacter, { target: { value: characters[0].getId() } })

    const selectSecondCharacter = await findByTestId('select-second-character')
    fireEvent.change(selectSecondCharacter, { target: { value: characters[1].getId() } })

    const noComicForCharacterError = await findByText('No existe ningún comic para este personaje 😱')
    expect(noComicForCharacterError).toBeDefined()
  })

  it('shows generic api error', async () => {
    const characters = aCharacterCollection()
    jest.spyOn(CharacterService, 'all').mockResolvedValue(characters)
    jest.spyOn(ThemeService, 'toggleMode').mockResolvedValue(undefined)
    const error = {
      ...new Error('error'),
      status: 500,
      response: new Response()
    }
    jest.spyOn(ComicService, 'common').mockRejectedValue(error)
    const { findByText, findByTestId } = renderWithRouter(
      <ThemeProvider>
        <Root />
      </ThemeProvider>,
      { route: routes.COMICS }
    )

    const selectFirstCharacter = await findByTestId('select-first-character')
    fireEvent.change(selectFirstCharacter, { target: { value: characters[0].getId() } })

    const selectSecondCharacter = await findByTestId('select-second-character')
    fireEvent.change(selectSecondCharacter, { target: { value: characters[1].getId() } })

    const noComicForCharacterError = await findByText('Vuelve a intentarlo más tarde... 🤕')
    expect(noComicForCharacterError).toBeDefined()
  })

  it('clears comic list', async () => {
    const characters = aCharacterCollection()
    const comics = aComicCollection()
    jest.spyOn(CharacterService, 'all').mockResolvedValue(characters)
    jest.spyOn(ThemeService, 'toggleMode').mockResolvedValue(undefined)
    jest.spyOn(ComicService, 'common').mockResolvedValue(comics)
    const { findByText, findByTestId, findAllByTestId, queryByTestId } = renderWithRouter(
      <ThemeProvider>
        <Root />
      </ThemeProvider>,
      { route: routes.COMICS }
    )

    const selectFirstCharacter = await findByTestId('select-first-character')
    fireEvent.change(selectFirstCharacter, { target: { value: characters[0].getId() } })

    const selectSecondCharacter = await findByTestId('select-second-character')
    fireEvent.change(selectSecondCharacter, { target: { value: characters[1].getId() } })

    await findAllByTestId('comic-item')
    const clearSearch = await findByText('Limpiar búsqueda')
    fireEvent.click(clearSearch)

    expect(queryByTestId('comic-item')).toBeNull()
  })

  it('selects characters and shows their comics and the comic count', async () => {
    const characters = aCharacterCollection()
    const comics = aComicCollection()
    jest.spyOn(CharacterService, 'all').mockResolvedValue(characters)
    jest.spyOn(ThemeService, 'toggleMode').mockResolvedValue(undefined)
    jest.spyOn(ComicService, 'common').mockResolvedValue(comics)
    const { findByText, findByTestId, findAllByTestId } = renderWithRouter(
      <ThemeProvider>
        <Root />
      </ThemeProvider>,
      { route: routes.COMICS }
    )

    const selectFirstCharacter = await findByTestId('select-first-character')
    fireEvent.change(selectFirstCharacter, { target: { value: characters[0].getId() } })

    const selectSecondCharacter = await findByTestId('select-second-character')
    fireEvent.change(selectSecondCharacter, { target: { value: characters[1].getId() } })

    const comicItems = await findAllByTestId('comic-item')
    expect(comicItems).toHaveLength(comics.length)

    const comicCount = await findByText(`Elementos en la lista: ${comicItems.length}`)
    expect(comicCount).toBeDefined()
  })

  it('logs out', async () => {
    jest.spyOn(CharacterService, 'all').mockResolvedValue(aCharacterCollection())
    jest.spyOn(ThemeService, 'toggleMode').mockResolvedValue(undefined)
    jest.spyOn(ComicService, 'common').mockResolvedValue(aComicCollection())
    jest.spyOn(UserService, 'logout').mockResolvedValue(undefined)
    jest.spyOn(navigator, 'goToLogin').mockResolvedValue(undefined)
    const { findByText } = renderWithRouter(
      <ThemeProvider>
        <Root />
      </ThemeProvider>,
      { route: routes.COMICS }
    )

    const logout = await findByText('Cerrar Sesión', { exact: false })
    fireEvent.click(logout)

    await wait(() => expect(navigator.goToLogin).toHaveBeenCalled())
  })

  it('toggles theme mode', async () => {
    jest.spyOn(CharacterService, 'all').mockResolvedValue(aCharacterCollection())
    jest.spyOn(ThemeService, 'toggleMode').mockResolvedValue(undefined)
    jest.spyOn(ComicService, 'common').mockResolvedValue(aComicCollection())
    jest.spyOn(UserService, 'logout').mockResolvedValue(undefined)
    jest.spyOn(navigator, 'goToLogin').mockResolvedValue(undefined)
    const { findByTestId, findByText } = renderWithRouter(
      <ThemeProvider>
        <Root />
      </ThemeProvider>,
      { route: routes.COMICS }
    )

    const themeToggle = await findByTestId('theme-mode-toggle')
    fireEvent.click(themeToggle)

    const themeModeText = await findByText('El tema actual es: modo día')
    expect(themeModeText).toBeDefined()
  })
})

const renderWithRouter = (ui, { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}) => ({
  ...render(<Router history={history}>{ui}</Router>),
  history
})
