import React from 'react'
import { GlobalStyles } from 'ui/theme/GlobalStyles'
import { ComicsList } from 'ui/views/ComicsList'
import { Route, Switch } from 'react-router-dom'
import { routes } from 'ui/routes'
import { PrivateRoute } from 'ui/views/_components/Routing/PrivateRoute'
import { Login } from 'ui/views/Login'

export const Root = () => (
  <>
    <GlobalStyles />
    <Switch>
      <PrivateRoute exact path={routes.COMICS} component={ComicsList} />
      <Route exact path={routes.LOGIN} component={Login} />
    </Switch>
  </>
)
