import { Login } from './Login'
import { Logout } from './Logout'
import { userStorage } from 'core/domain/model/User/UserStorage'

export const UserService = {
  login: Login({ userStorage }),
  logout: Logout({ userStorage })
}
