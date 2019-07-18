import { User } from 'core/domain/model/User/User'

export const Login = ({ userStorage }) => async (username, password) => {
  return new Promise(resolve => {
    setTimeout(() => {
      userStorage.set(new User(`${username}#${password}`))
      resolve()
    }, 500)
  })
}
