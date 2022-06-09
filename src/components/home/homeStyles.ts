import styled from 'styled-components'

import { Link } from 'react-router-dom'
import { LoginToggleProps } from '../../App'
import { media } from './media'

const fontSize = 3

export const HomeScreenTitle = styled.div`
  font-size: ${fontSize + 2}vh;
  align-self: center;
  justify-self: center;
`

export const LoginContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: flex-end;
`

export const MainScreen = styled.div`
  display: grid;
  width: 40rem;
  height: 25rem;
  background-color: var(--white);
  color: var(--blue);
`

export const HomeScreenContainer = styled.div`
  display: grid;
  height: 95vh;
  grid-template-rows: 1fr 2fr;
`
export const StudentHomeScreenOptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 1fr;
  grid-auto-flow: row;
  grid-gap: 1vh;
  padding: 2vh;
`
export const StudentHomeScreenOptions = styled(Link)`
  display: grid;
  grid-template-rows: 1fr 1fr;
  border: 1px solid var(--blue);
  border-radius: 10px;
  justify-items: center;
  align-items: center;
  text-decoration: none;
  color: var(--blue);
  :hover {
    box-shadow: 2px 2px 2px var(--blue);
    /* color: var(--white); */
    /* background-color: var(--blue); */
  }
`
// export const StudentHomeScreenOptionsLink = styled(StudentHomeScreenOptions)`

// `

export const LogoutOption = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  border: 1px solid var(--blue);
  border-radius: 10px;
  justify-items: center;
  align-items: center;
  :hover {
    box-shadow: 2px 2px 2px var(--blue);
    /* color: var(--white); */
    /* background-color: var(--blue); */
  }

  font-size: ${fontSize}vh;
`
export const OptionTitle = styled.div`
  font-size: ${fontSize}vh;
`
export const GetStartedButtonContainer = styled.div`
  grid-row: 4/5;
  grid-column: 1/-1;
  display: grid;
  grid-auto-columns: 1fr;
  justify-items: center;
  align-items: center;
`
export const StudentGradeContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  justify-items: center;
  align-items: center;
  font-size: ${fontSize}vh;
`

export const GradeDisplay = styled.div`
  font-size: ${fontSize}vh;
`

export const StudentOptionsLinkButton = styled.button`
  width: 10vh;
  height: 3vh;
  margin-top: 10%;
  font-size: 1.1vw;
  color: var(--white);
  background-color: var(--blue);
  box-shadow: 3px 3px 3px var(--grey);
`

export const GetStartedButton = styled.button`
  ${media.macBookPro16} {
    width: 10rem;
    height: 3rem;
    font-size: ${fontSize}vh;
    color: var(--white);
    background-color: var(--blue);
    box-shadow: 3px 3px 3px var(--grey);
    justify-self: center;
  }
  ${media.iPhone} {
    width: 7rem;
    height: 2rem;
    font-size: 1.1vw;
    color: var(--white);
    background-color: var(--blue);
  }
`

export const StyledLink = styled(Link)`
  color: var(--white);
  text-decoration: none;
  /* font-size: 1rem; */
`

export const HomeLink = styled(StyledLink)`
  font-size: 1.5rem;
  ${media.iPhone} {
    font-size: 1rem;
  }
  padding-left: 2%;
`
export const DashboardLink = styled(StyledLink)`
  font-size: 1.5rem;
  ${media.iPhone} {
    font-size: 1rem;
  }
  padding-right: 2%;
`

export const LoginLink = styled(StyledLink)`
  font-size: 1.5rem;
  ${media.iPhone} {
    font-size: 1rem;
  }
  padding-right: 2%;
`

export const LogoutLink = styled.div`
  color: var(--white);
  cursor: pointer;
  ${media.iPhone} {
    font-size: 1rem;
  }
  padding-right: 2%;
`

export const LoginToggle = styled.div<LoginToggleProps>`
  font-size: 2rem;
  color: var(--white);
  cursor: pointer;
  ${media.iPhone} {
    font-size: 1rem;
  }
  margin-right: 2%;
`
export const PasswordContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  width: 100%;
  height: 100%;
  justify-items: center;
  align-items: center;
`
export const NewPasswordInpt = styled.input`
  width: 80%;
  height: 65%;
  font-size: smaller;
`
export const AcceptNewPasswordButton = styled.button`
  width: 95%;

  background: var(--blue);
  color: var(--white);
  font-size: smaller;
`
