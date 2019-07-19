import { ToggleThemeMode } from '../ToggleThemeMode'
import { eventEmitter } from 'core/infrastructure/eventEmitter'
import { ThemeEvent } from 'core/domain/model/Theme/Theme'
import { aTheme } from 'core/domain/model/__builders__/ThemeBuilder'

describe('Toggle theme mode', () => {
  const themeManager = {
    toggleMode: jest.fn()
  }
  const ToggleThemeModeService = ToggleThemeMode({ themeManager })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('toggles theme calling theme manager', async () => {
    const themeMode = aTheme().getMode()

    await ToggleThemeModeService(themeMode)

    expect(themeManager.toggleMode).toHaveBeenCalledWith(themeMode)
  })

  it('emits theme updated event', async () => {
    const themeMode = aTheme().getMode()
    const onThemeUpdated = jest.fn()
    eventEmitter.on(ThemeEvent.updated, onThemeUpdated)

    await ToggleThemeModeService(themeMode)

    expect(onThemeUpdated).toHaveBeenCalledWith(aTheme())
  })
})
