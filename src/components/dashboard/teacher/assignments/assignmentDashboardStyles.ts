import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const AssignmentDashboardDisplayContainer = styled.div`
  display: grid;
  height: 95vh;
  grid-template-rows: 1fr 2fr;
`
export const AssignmentTitle = styled.div`
  font-size: 5vh;
  font-weight: 200;
  align-self: center;
  justify-self: center;
`
export const AssignmentDisplayOptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  grid-auto-flow: row;
  grid-gap: 1vh;
  padding: 2vh;
`
export const AssignmentsDisplayOptions = styled.div`
  display: grid;
  /* grid-template-rows: 1fr 1fr; */
  border: 1px solid var(--blue);
  border-radius: 10px;
  justify-items: center;
  align-items: center;
  text-decoration: none;
  color: var(--blue);
  font-size: 3vh;
  :hover {
    box-shadow: 2px 2px 2px var(--blue);
  }
`
export const AssignmentsDisplayOptionsLink = styled(Link)`
  display: grid;
  grid-template-rows: 1fr 1fr;
  border: 1px solid var(--blue);
  border-radius: 10px;
  justify-items: center;
  align-items: center;
  text-decoration: none;
  color: var(--blue);
  font-size: 3vh;
  :hover {
    box-shadow: 2px 2px 2px var(--blue);
  }
`
