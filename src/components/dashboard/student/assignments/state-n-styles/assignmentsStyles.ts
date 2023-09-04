import { Standard8x12Container } from '../../../../../appStyles'
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

export type AssignmentsTypeStyleProps = {
  selected: boolean
}

export const AssignmentsTypeStyle = styled.div<AssignmentsTypeStyleProps>`
  margin-left: 3%;
  font-size: 2rem;
  cursor: pointer;
  text-decoration: ${({ selected }) => (selected ? 'underline' : 'none')};
`

export const AssignmentTypeContainer = styled(Standard8x12Container)`
  grid-row: 1/-1;
  grid-column: 4/-1;
`

export const NoWorkContainer = styled.div`
  grid-row: 4/-1;
  grid-column: 5/-1;
  justify-items: center;
  align-items: center;
  font-size: 3vh;
`
export const MarkingPeriodSelectorContainer = styled.div`
  grid-row: -2/-1;
  grid-column: 1/-1;
  display: grid;
  width: 100%;
  font-size: 2vw;
  grid-template-columns: 1fr 1fr;
`

export const MarkingPeriodSelectorTitle = styled.div`
  justify-self: right;
  align-self: center;
  margin-right: 10%;
`

export const MarkingPeriodSelectorSwitchContainer = styled.div`
  justify-self: left;
  align-self: center;
  /* margin-left: 10%; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  width: 60%;
`

export const MarkingPeriodSelectedSwitchArrow = styled.div`
  cursor: pointer;
`

export const MarkingPeriodSelectedMarkingPeriod = styled.div``

export const AssignmentTypeTitle = styled.div`
  display: grid;
  grid-row: 1/2;
  grid-column: 1/-1;
  justify-items: center;
  align-items: center;
  font-size: 3rem;
  text-decoration: underline;
`
export const AssignmentTypeContentContainer = styled.div`
  display: grid;
  grid-row: 2/-2;
  grid-column: 2/-2;
  grid-auto-rows: 10%;
  overflow: scroll;
`

export const CompletedAssignmentTypeContentContainer = styled.div`
  grid-row: 2/-2;
  grid-column: 2/-2;
  grid-auto-rows: 10%;
  overflow: scroll;
`
export const CompletedAssignmentAssignmentAndScoreContainer = styled.div`
  display: grid;
  font-size: 3vh;
  grid-template-columns: 5fr 1fr;
`
export const AssignmentLink = styled(Link)`
  /* font-size: 2rem; */
  text-decoration: none;
  color: var(--blue);
`
export const PendingAssignmentLink = styled(Link)`
  /* font-size: 2rem; */
  text-decoration: none;
  color: var(--grey);
`
export const AssignmentScore = styled.div`
  font-size: 3vh;
  align-self: center;
  justify-self: center;
`
export const PendingAssignmentScore = styled.div`
  font-size: 3vh;
  align-self: center;
  justify-self: center;
  color: var(--grey);
`
export const CompletionMessage = styled.div`
  font-size: 2rem;
`
export const AssignmentLinkLi = styled.li`
  font-size: 3vh;
  align-self: center;
`
export const PendingAssignmentLinkLi = styled.li`
  font-size: 3vh;
  align-self: center;

  color: var(--grey);
`

export const AllAssignmentsMainContainer = styled.div`
  grid-row: 1/-1;
  grid-column: 1/-1;
  display: grid;
  grid-template-rows: 1fr 2fr 13fr;
`
export const AssignmentDisplayContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 15fr;
  padding: 1vh;
`
export const AssignmentDisplayTitle = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 3vh;
`
export const AssignmentTypeSelect = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-items: center;
  align-items: center;
  font-size: 2vh;
`

export const AssignmentDisplayCategoryDisplay = styled.div`
  color: var(--white);
  background-color: var(--blue);
  display: grid;
  font-size: 2vh;
  align-items: center;
  grid-auto-flow: column;
  padding-left: 2vh;
`
export const AssignmentsContainer = styled.div`
  border: 3px solid var(--blue);
  display: grid;
  font-size: 1.5vh;
  height: 55vh;
  overflow: scroll;
`
export const IndividualAssignment = styled.div`
  display: grid;
  justify-items: start;
  align-items: center;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  padding-left: 2vh;
`
