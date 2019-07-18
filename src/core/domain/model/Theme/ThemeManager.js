import { ApiThemeManager } from 'core/infrastructure/domain/model/Theme/ApiThemeManager'

export const ThemeManager = {
  toggleMode: () => Promise.reject('[ThemeManager#toggleMode] must be implemented')
}

export const themeManager = Object.assign({}, ThemeManager, ApiThemeManager)
