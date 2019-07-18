import React from 'react'
import { Theme, ThemeEvent } from 'core/domain/model/Theme/Theme'
import { eventEmitter } from 'core/infrastructure/eventEmitter'

const defaultTheme = new Theme('DAY')

export const ThemeContext = React.createContext({
  theme: defaultTheme
})

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState(defaultTheme)

  React.useEffect(() => {
    const toggleTheme = theme => {
      setTheme(theme)
    }
    eventEmitter.on(ThemeEvent.updated, toggleTheme)

    return () => {
      eventEmitter.off(ThemeEvent.updated, toggleTheme)
    }
  }, [])

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
