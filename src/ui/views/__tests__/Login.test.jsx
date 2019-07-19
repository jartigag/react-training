import { cleanup, render, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import React from 'react'
import { UserService } from 'core/services/User'
import { Root } from 'ui/views/Root'
import { ThemeProvider } from 'ui/views/_components/_context/ThemeContext'
import { userStorage } from 'core/domain/model/User/UserStorage'

describe('Login', () => {
  afterEach(() => {
    cleanup()
    jest.resetAllMocks()
  })

  it('logs in and shows comic list', async () => {
    jest.spyOn(UserService, 'login').mockResolvedValue(undefined)
    jest.spyOn(userStorage, 'hasToken').mockReturnValue(false)
    const { findByText, findByTestId, findByPlaceholderText } = render(
      <MemoryRouter>
        <ThemeProvider>
          <Root />
        </ThemeProvider>
      </MemoryRouter>
    )

    const usernameInput = await findByPlaceholderText('Usuario')
    fireEvent.change(usernameInput, { target: { value: 'user' } })

    const passwordInput = await findByPlaceholderText('Contraseña')
    fireEvent.change(passwordInput, { target: { value: 'test123' } })

    jest.spyOn(userStorage, 'hasToken').mockReturnValue(true)

    const loginForm = await findByTestId('login-form')
    fireEvent.submit(loginForm)

    const comicListTitle = await findByText('Buscador de cómics de Marvel')
    expect(comicListTitle).toBeDefined()
  })
})
