import styled from 'styled-components'
import { Standard8x12Container } from '../../../../../../appStyles'

export const CreateAssignmentsContainer = styled(Standard8x12Container)`
  /* display: grid; */
  /* grid-template-columns: 1fr 4fr; */
  height: 95vh;
`

export const CourseSelectContainer = styled.div`
  grid-row: 1/-1;
  grid-column: 1/3;
  background: var(--blue);
  color: var(--white);
  font-size: 4vh;
  cursor: pointer;
  display: grid;
  border-top: 3px solid var(--white);
  grid-auto-rows: 10%;
  justify-items: center;
  align-items: center;
`

export const CreateAssignmentTitle = styled.div`
  grid-row: 1/2;
  grid-column: 3/-1;
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 4vh;
`
export const AssignmentTypeSelectorContainer = styled.div`
  grid-row: 2/3;
  grid-column: 3/-1;
  font-size: 3vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export type AssignmentTypeTypes = {
  selected: boolean
}

export const AssignmentType = styled.div<AssignmentTypeTypes>`
  display: grid;
  justify-items: center;
  align-items: center;
  border-bottom: ${({ selected }) =>
    selected ? '3px solid var(--blue)' : '3px solid var(--white)'};
`

export const AssignmentCreatorContainer = styled(Standard8x12Container)`
  grid-row: 3/-1;
  grid-column: 3/-1;
`
