import { Logout } from '../Logout'

describe('Logout', () => {
  const userStorage = {
    remove: jest.fn()
  }
  const LogoutService = Logout({ userStorage })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('sets user', async () => {
    await LogoutService()

    expect(userStorage.remove).toHaveBeenCalled()
  })
})
