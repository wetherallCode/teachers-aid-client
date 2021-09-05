import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const RosterDashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  height: 95vh;
`

export const RosterNavigationContainer = styled.div`
  background-color: var(--blue);
  border-top: 3px solid var(--white);
  display: grid;
  grid-auto-flow: row;
  justify-items: center;
  align-items: center;
`

export const RosterNavLink = styled(Link)`
  color: var(--white);
  text-decoration: none;
  font-size: 2.5vh;
  &:hover {
    text-decoration: underline;
  }
`
export const CourseName = styled.div`
  color: var(--white);
  text-decoration: none;
  font-size: 2.5vh;
`
