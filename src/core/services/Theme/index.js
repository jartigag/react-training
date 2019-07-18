import { ToggleThemeMode } from './ToggleThemeMode'
import { themeManager } from 'core/domain/model/Theme/ThemeManager'

export const ThemeService = {
  toggleMode: ToggleThemeMode({ themeManager })
}
