import { routes } from 'ui/routes'
import { history } from './history'

export const navigator = {
  goToLogin: () => {
    history.push(routes.LOGIN)
  }
}
