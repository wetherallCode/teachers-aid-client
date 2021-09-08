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

export const ViewRosterContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 10fr;
`
export const ViewRosterTitle = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 3vh;
`

export const RosterItemsContainer = styled.div`
  font-size: 2vh;
  height: 85vh;
  overflow: scroll;
`

export type RosterItemsProps = {
  highlighted: boolean
}

export const RosterItems = styled.div<RosterItemsProps>`
  background-color: ${({ highlighted }) =>
    highlighted ? 'var(--grey)' : 'var(--white)'};
  display: grid;
  grid-template-columns: 3fr 2fr;
  padding-left: 5%;
  padding-right: 5%;
`
