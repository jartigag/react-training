export class ComicsListPage {
  visit = () => {
    cy.visit('/')

    return this
  }

  selectFirstCharacter = (value) => {
    cy.get('select[data-testid~="select-first-character"]').select(value)

    return this
  }

  selectSecondCharacter = (value) => {
    cy.get('select[data-testid~="select-second-character"]').select(value)

    return this
  }

  isShowingComicList = () => {
    cy.get('[data-testid~="comic-item"]', { timeout: 10000 }).should('have.length', 10)

    return true
  }

  toggleThemeMode = () => {
    cy.get('input[data-testid~="theme-mode-toggle"]').click()

    return true
  }

  isThemeModeDark = () => {
    cy.contains('El tema actual es: modo noche')

    return true
  }
}
