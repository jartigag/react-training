export class LoginPage {
  visit = () => {
    cy.visit('/login')

    return this
  }

  fillUser = (value) => {
    cy.get('input[placeholder="Usuario"]').type(value)

    return this
  }

  fillPassword = (value) => {
    cy.get('input[placeholder="Contraseña"]').type(value)

    return this
  }

  submit = () => {
    cy.get('form').submit()

    return this
  }

  isInComicList = () => {
    cy.contains('Buscador de cómics de Marvel')

    return true
  }

  containsPasswordErrorText = () => {
    cy.contains('La contraseña debe tener al menos un número y una letra.')

    return true
  }
}
