import { Standard8x12Container } from '../../../../appStyles'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const AssignmentsToCompleteContainer = styled(Standard8x12Container)`
  height: 95vh;
  border-top: 3px solid var(--white);
`

export const AssignmentsTypeSelectorPanel = styled.div`
  grid-row: 1/-1;
  grid-column: 1/4;
  background-color: var(--blue);
  color: var(--white);

  display: grid;
  grid-template-rows: repeat(10, 1fr);
  justify-items: left;
  align-items: center;
`
export const AssignmentsTypeSelectorHeader = styled.div`
  text-decoration: underline;
  font-size: 2.2rem;
  justify-self: center;
`
export const AssignmentsTypeStyle = styled.div`
  margin-left: 3%;
  font-size: 2rem;
`

export const AssignmentTypeContainer = styled(Standard8x12Container)`
  grid-row: 1/-1;
  grid-column: 4/-1;
`
export const AssignmentTypeTitle = styled.div`
  display: grid;
  grid-row: 1/2;
  grid-column: 1/-1;
  justify-items: center;
  align-items: center;
  font-size: 3rem;
`
export const AssignmentTypeContentContainer = styled.div`
  display: grid;
  grid-row: 2/-1;
  grid-column: 2/-2;
  grid-auto-rows: 10%;
`
export const AssignmentLink = styled(Link)`
  font-size: 2rem;
  text-decoration: none;
  color: var(--blue);
`
