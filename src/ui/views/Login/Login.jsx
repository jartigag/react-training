import React from 'react'
import { BoxColumn, ButtonRow, Container, Input, LoginBox, Logo } from './Login.style'
import { Button } from 'ui/components/Button/Button'
import { Text } from 'ui/components/Text'
import { Redirect } from 'react-router-dom'
import { routes } from 'ui/routes'
import reactLogo from './react-logo.png'

export const Login = ({ location }) => {
  const [user, setUser] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [redirectToReferrer, setRedirectToReferrer] = React.useState(false)
  const { from } = location.state || { from: { pathname: routes.COMICS } }

  if (redirectToReferrer) {
    return <Redirect to={from} />
  }

  return (
    <Container>
      <BoxColumn>
        <Logo src={reactLogo} alt="React logo" />
        <LoginBox>
          <Text marginTop="extrasmall" marginBottom="extrasmall" as="span" textAlign="center" size="base">
            Iniciar sesión
          </Text>
          <Input value={user} onChange={e => setUser(e.target.value)} placeholder="Usuario" />
          <Input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Contraseña"
          />
          <ButtonRow>
            <Button type="submit" size="small">
              Acceder
            </Button>
          </ButtonRow>
        </LoginBox>
      </BoxColumn>
    </Container>
  )
}
