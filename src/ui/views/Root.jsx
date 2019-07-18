import React from 'react'
import { GlobalStyles } from 'ui/theme/GlobalStyles'
import { ComicsList } from 'ui/views/ComicsList'
import { Route, Switch } from 'react-router-dom'
import { routes } from 'ui/routes'

export const Root = () => (
  <>
    <GlobalStyles />
    <Switch>
      <Route exact path={routes.COMICS} component={ComicsList} />
    </Switch>
  </>
)
