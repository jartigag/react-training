import React from 'react'
import { GlobalStyles } from 'ui/theme/GlobalStyles'
import { ComicsList } from 'ui/views/ComicsList'
import { Route, Switch } from 'react-router-dom'
import { routes } from 'ui/routes'
import { PrivateRoute } from 'ui/views/_components/Routing/PrivateRoute'
import { Login } from 'ui/views/Login'
import { ThemeContext } from 'ui/views/_components/_context/ThemeContext'
import { color } from 'ui/theme/colors'

export const Root = () => {
  const theme = React.useContext(ThemeContext)

  return (
    <div style={{ backgroundColor: theme.getMode() === 'DAY' ? color.white : color.dark, height: '100vh' }}>
      <GlobalStyles />
      <Switch>
        <PrivateRoute exact path={routes.COMICS} component={ComicsList} />
        <Route exact path={routes.LOGIN} component={Login} />
      </Switch>
    </div>
  )
}
