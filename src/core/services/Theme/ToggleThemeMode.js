import { eventEmitter } from 'core/infrastructure/eventEmitter'
import { ThemeEvent } from 'core/domain/model/Theme/Theme'
import { Theme } from 'core/domain/model/Theme/Theme'

export const ToggleThemeMode = ({ themeManager }) => async themeMode => {
  eventEmitter.emit(ThemeEvent.updated, new Theme(themeMode))
  return themeManager.toggleMode(themeMode)
}
