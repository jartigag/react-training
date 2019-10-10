import React from 'react'
import isNull from 'lodash/isNull'

export const usePresenter = createPresenter => {
  const presenter = React.useRef(null)
  if (isNull(presenter.current)) {
    presenter.current = createPresenter()
  }

  return presenter.current
}
