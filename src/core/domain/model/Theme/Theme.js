export class Theme {
  constructor(mode) {
    this.mode = mode
  }

  getMode() {
    return this.mode
  }
}

export const ThemeEvent = {
  updated: 'theme_updated'
}
