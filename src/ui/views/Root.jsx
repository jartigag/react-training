import React from 'react'
import { GlobalStyles } from 'ui/theme/GlobalStyles'
import { ComicsList } from 'ui/views/ComicsList'

export const Root = () => (
  <div>
    <GlobalStyles />
    <ComicsList />
  </div>
)
