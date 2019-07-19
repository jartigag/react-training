import { LoginPage } from './pages/Login'

describe('Login', () => {
  const loginPage = new LoginPage()

  it('logs in and goes to comic list', () => {
    loginPage.visit()
    cy.document().toMatchImageSnapshot()

    loginPage.fillUser('test')
      .fillPassword('password123')
      .submit()

    expect(loginPage.isInComicList()).to.be.true
  })

  it('shows an error if password has invalid format', () => {
    loginPage
      .visit()
      .fillUser('test')
      .fillPassword('passwordWithoutNumbers')
      .submit()

    expect(loginPage.containsPasswordErrorText()).to.be.true
    cy.document().toMatchImageSnapshot()
  })
})
