describe('Login', () => {
  it('logs in and goes to comic list', () => {
    cy.visit('/login')

    cy.get('input[placeholder="Usuario"]').type('test')
    cy.get('input[placeholder="Contraseña"]').type('password123')
    cy.get('form').submit()

    cy.contains('Buscador de cómics de Marvel')
  })
})
