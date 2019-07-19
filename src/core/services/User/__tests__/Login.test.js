import { Login } from '../Login'
import { aUser } from 'core/domain/model/__builders__/UserBuilder'

describe('Login', () => {
  const userStorage = {
    set: jest.fn()
  }
  const LoginService = Login({ userStorage })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('sets user', async () => {
    const username = 'username'
    const password = 'password1'
    const user = aUser({ token: `${username}#${password}` })

    await LoginService(username, password)

    expect(userStorage.set).toHaveBeenCalledWith(user)
  })
})
