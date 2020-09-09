import styled from 'styled-components'

import { Link } from 'react-router-dom'
import { LoginToggleProps } from '../../App'
import { media } from './media'
import { Standard8x12Container } from '../../appStyles'

export const HomeScreenTitle = styled.h1`
  grid-row: 2/4;
  grid-column: 1/-1;
  ${media.macBookPro16} {
    font-size: 250%;
  }
  ${media.iPhone} {
    font-size: 150%;
  }
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

export const HomeScreenContainer = styled(Standard8x12Container)`
  display: grid;
  height: 95vh;
  justify-items: center;
  align-items: start;
  /* text-shadow: 2px 2px 2px var(--grey); */
`

export const GetStartedButtonContainer = styled.div`
  grid-row: 4/5;
  grid-column: 1/-1;
  display: grid;
  justify-items: center;
  align-items: center;
`
export const GetStartedButton = styled.button`
  ${media.macBookPro16} {
    width: 10rem;
    height: 3rem;
    font-size: smaller;
    color: var(--white);
    background-color: var(--blue);
    box-shadow: 3px 3px 3px var(--grey);
  }
  ${media.iPhone} {
    width: 7rem;
    height: 2rem;
    font-size: 80%;
    color: var(--white);
    background-color: var(--blue);
  }
`

export const StyledLink = styled(Link)`
  color: var(--white);
  text-decoration: none;
  font-size: 1rem;
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
  grid-row: 4/5;
  grid-column: 1/-1;
  font-size: 2rem;
  display: grid;
  height: 140%;
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
