import { LocalUserStorage } from '../LocalUserStorage'
import { aUser } from '../../../../../domain/model/__builders__/UserBuilder'

describe('LocalUserStorage', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('gets user', () => {
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue('{"token":"test#password1"}')

    const user = LocalUserStorage.get()

    expect(user).toEqual(aUser({ token: 'test#password1' }))
  })

  it('does not get user if there is no user saved', () => {
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(null)

    const user = LocalUserStorage.get()

    expect(user).toEqual(undefined)
  })

  it('sets user', () => {
    jest.spyOn(window.localStorage.__proto__, 'setItem').mockReturnValue(undefined)

    LocalUserStorage.set(aUser({ token: 'test#password1' }))

    expect(localStorage.setItem).toHaveBeenCalledWith(expect.anything(), '{"token":"test#password1"}')
  })

  it('removes user', () => {
    jest.spyOn(window.localStorage.__proto__, 'removeItem').mockReturnValue(undefined)

    LocalUserStorage.remove()

    expect(localStorage.removeItem).toHaveBeenCalled()
  })

  it('has user token', () => {
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue('{"token":"test#password1"}')

    const hasToken = LocalUserStorage.hasToken()

    expect(hasToken).toBeTruthy()
  })

  it('does not have user token', () => {
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(null)

    const hasToken = LocalUserStorage.hasToken()

    expect(hasToken).toBeFalsy()
  })
})
