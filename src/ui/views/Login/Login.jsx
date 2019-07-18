import React from 'react'
import { BoxColumn, ButtonRow, Container, Input, LoginBox, Logo } from './Login.style'
import { Button } from 'ui/components/Button/Button'
import { Text } from 'ui/components/Text'
import { Redirect } from 'react-router-dom'
import { routes } from 'ui/routes'
import reactLogo from './react-logo.png'
import { UserService } from 'core/services/User'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'

export const Login = ({ location }) => {
  const [redirectToReferrer, setRedirectToReferrer] = React.useState(false)
  const { from } = location.state || { from: { pathname: routes.COMICS } }
  const onLogin = async (user, password) => {
    await UserService.login(user, password)
    setRedirectToReferrer(true)
  }

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
          <Formik
            initialValues={{ user: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              onLogin(values.user, values.password)
              setSubmitting(false)
            }}>
            {({ isSubmitting }) => (
              <LoginForm>
                <Field name="user" type="text">
                  {({ field }) => <LoginInput type="text" {...field} placeholder="Usuario" />}
                </Field>
                <ErrorMessage name="user" component="div" />
                <Field type="password" name="password">
                  {({ field }) => <LoginInput type="password" {...field} placeholder="Contraseña" />}
                </Field>
                <ErrorMessage name="password" component="div" />
                <ButtonRow>
                  <Button type="submit" size="small" disabled={isSubmitting}>
                    Acceder
                  </Button>
                </ButtonRow>
              </LoginForm>
            )}
          </Formik>
        </LoginBox>
      </BoxColumn>
    </Container>
  )
}

const LoginForm = styled(Form)`
  width: 100%;
`

const LoginInput = styled(Input)`
  display: block;
  width: 100%;
`

const oneNumberAndOneLetterAtLeast = /^(?=.*[0-9])(?=.*[a-zA-Z]).*$/
const validationSchema = Yup.object().shape({
  user: Yup.string().required('Debes introducir un usuario'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres.')
    .matches(oneNumberAndOneLetterAtLeast, {
      message: 'La contraseña debe tener al menos un número y una letra.',
      excludeEmptyString: true
    })
    .required('Debes introducir una contraseña')
})
