import { User } from 'core/domain/model/User/User'
import isNil from 'lodash/isNil'

const USER_TOKEN = 'userToken'

const get = () => {
  const userDTO = JSON.parse(localStorage.getItem(USER_TOKEN))
  if (isNil(userDTO)) {
    return
  }

  return new User(userDTO.token)
}

const set = user => localStorage.setItem(USER_TOKEN, JSON.stringify(user))

const remove = () => localStorage.removeItem(USER_TOKEN)

const hasToken = () => {
  const user = get()
  return !isNil(user) && !isNil(user.getToken())
}

export const LocalUserStorage = {
  get,
  set,
  remove,
  hasToken
}
