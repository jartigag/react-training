import { api } from 'core/infrastructure/api'

const toggleMode = async themeMode => api.postThemeMode(themeMode)

export const ApiThemeManager = {
  toggleMode
}
