import styled from 'styled-components'
import { Standard8x12Container } from '../../../../../../appStyles'

export const LessonPlannerContainer = styled(Standard8x12Container)`
  height: 95vh;
`
export const LessonPlanOutput = styled.div`
  grid-row: 1/-1;
  grid-column: -4/-1;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-rows: repeat(12, 1fr);
  background-color: var(--blue);
  border-left: 3px solid var(--white);
  border-top: 3px solid var(--white);
  color: var(--white);
  font-size: 1.2rem;
`
export const LessonPlanOutputHeader = styled.div`
  font-size: 2rem;
  text-decoration: underline;
`

export const LessonPlannerDesignContainer = styled(Standard8x12Container)`
  grid-row: 1/-1;
  grid-column: 1/-4;
  border-right: 1px solid var(--blue);
  /* border: 1px solid var(--blue); */
  /* border: 1px solid var(--blue); */
`

export const LessonPlanGeneralInfoContainer = styled.div`
  grid-row: 2/-1;
  grid-column: 1/-1;
  /* display: grid;
  justify-items: center;
  align-items: start; */
  font-size: 2.5rem;
`

export const LessonPlanDateAssign = styled.div`
  grid-row: 3/6;
  grid-column: 3/-3;
  display: grid;
  grid-template-rows: 1fr 3fr;
  justify-items: center;
  align-items: center;
  font-size: 2.5rem;
`
export const LessonPlanDateInput = styled.input`
  width: 32%;
  height: 17%;
  font-size: 1.5rem;
  color: var(--blue);
`

export const LessonPlannerHeader = styled.div`
  grid-row: 1/2;
  grid-column: 1/-1;
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 3rem;
  text-decoration: underline;
`
export const TextPickerContainer = styled.div``
