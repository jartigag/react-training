import { ApiThemeManager } from '../ApiThemeManager'
import { aTheme } from 'core/domain/model/__builders__/ThemeBuilder'
import { api } from 'core/infrastructure/api'

describe('Api theme manager', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('toggles mode', async () => {
    jest.spyOn(api, 'postThemeMode').mockResolvedValue({})

    await ApiThemeManager.toggleMode(aTheme().getMode())

    expect(api.postThemeMode).toHaveBeenCalledWith(aTheme().getMode())
  })
})
