import { User } from 'core/domain/model/User/User'

export const aUser = ({ token = 'token' }) => {
  return new User(token)
}
