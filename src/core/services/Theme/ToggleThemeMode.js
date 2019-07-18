export const ToggleThemeMode = ({ themeManager }) => async themeMode => {
  return themeManager.toggleMode(themeMode)
}
