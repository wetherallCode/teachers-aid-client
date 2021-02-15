import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { LoginToggleProps } from '../../App'
import { media } from './media'

export const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr 4fr;
  background-color: var(--blue);
  color: var(--white);
  height: 5vh;
  align-items: center;
  justify-content: center;
  /* text-shadow: '2px 2px 8px #474747'; */
  border-bottom: '3px solid var(--white)';
`
export const StyledLink = styled(Link)`
  color: var(--white);
  text-decoration: none;
  font-size: 2rem;
  ${media.iPhone} {
    font-size: 1rem;
  }
`

export const HomeLink = styled(StyledLink)`
  padding-left: 2%;
  color: var(--white);
`
export const DashboardLink = styled(StyledLink)`
  padding-right: 2%;
`

export const LoginLink = styled(StyledLink)`
  padding-right: 2%;
`

export const LogoutLink = styled.div`
  font-size: 1.5rem;
  ${media.iPhone} {
    font-size: 1rem;
  }
  padding-right: 2%;
`

export const LoginToggle = styled.div<LoginToggleProps>`
  padding-right: 2%;
  font-size: 1.5rem;
  color: var(--white);
  cursor: pointer;
  ${media.iPhone} {
    font-size: 1rem;
  }
`

export const UserNameHeader = styled.div<LoginToggleProps>`
  font-size: 2rem;
  ${media.iPhone} {
    font-size: 1rem;
  }
  margin-right: 2%;
  color: var(--white);
`
