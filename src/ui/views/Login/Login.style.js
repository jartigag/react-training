import styled from 'styled-components'
import { color, sizes } from 'ui/theme'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${color.blue2};
`
export const BoxColumn = styled.div`
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20vh;
`

export const LoginBox = styled.div`
  background: ${color.white};
  padding: ${sizes.medium};
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  align-content: center;
  flex-direction: column;
`

export const Input = styled.input`
  margin-bottom: ${sizes.base};
  background-color: ${color.white};
  border: 1px solid ${color.gray4};
  height: ${sizes.large};
  padding-left: ${sizes.extrasmall};
`

export const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
`

export const Logo = styled.img`
  width: 192px;
  height: 192px;
  margin-bottom: ${sizes.medium};
`
