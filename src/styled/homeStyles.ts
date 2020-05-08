import styled from 'styled-components'
import { media } from '.'
import { Link } from 'react-router-dom'
import { LoginToggleProps } from '../App'

export const HomeScreenTitle = styled.h1`
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
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 40rem;
  height: 25rem;
  background-color: var(--white);
  color: var(--blue);
`

export const HomeScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const GetStartedButton = styled.button`
  ${media.macBookPro16} {
    width: 10rem;
    height: 3rem;
    font-size: 140%;
    color: var(--white);
    background-color: var(--blue);
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
