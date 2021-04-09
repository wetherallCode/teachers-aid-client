import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Standard8x12Container } from '../../../../../../appStyles'

export const EssaysToGradeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  height: 95vh;
`

export const CourseSelectContainer = styled.div`
  background: var(--blue);
  color: var(--white);
  font-size: 4vh;
  cursor: pointer;
  display: grid;
  border-top: 3px solid var(--white);
  grid-template-rows: 5fr 1fr;
`

export const CourseSelect = styled.div`
  display: grid;
  grid-auto-rows: 10%;
  justify-items: center;
  align-items: center;
`
export type CourseToSelectProps = { selected: boolean }
export const CourseToSelect = styled.span<CourseToSelectProps>`
text-decoration: ${({ selected }) => (selected ? 'underline' : 'none')}  
&:hover {
    color: var(--grey);
  }
`

export const CourseEssaysToGradeContainer = styled.div`
  display: grid;
  grid-template-rows: 9% 8% 8% 70% 5%;
`

export const EssayTitle = styled.div`
  /* grid-row: 1/2;
  grid-column: 1/-1; */
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 4vh;
`
export const MarkingPeriodSelector = styled.div`
  display: grid;
  align-self: center;
`

export const EssayStatusSelector = styled.div`
  display: grid;
  grid-auto-flow: column;
  font-size: 3vh;
  align-items: center;
  justify-items: center;
  margin-left: 5%;
  margin-right: 5%;
  border-bottom: 3px solid var(--blue);
`
export type EssayStatusSelectProps = {
  toGradeIndicator: boolean
}
export const EssayStatusSelect = styled.div<EssayStatusSelectProps>`
  color: ${({ toGradeIndicator }) =>
    toGradeIndicator ? 'var(--red)' : 'var(--false)'};
`

export const EssayListContainer = styled.div`
  /* grid-row: 4/-2;
  grid-column: 1/-1; */
  margin-left: 5%;
`
export const EssayList = styled.ul``
export const EssayListItem = styled.li`
  padding-bottom: 1vh;
`

export const EssaySelect = styled(Link)`
  color: var(--blue);
  text-decoration: none;
  font-size: 2vh;
`

export const OrderSwitchContainer = styled.div`
  /* grid-row: -1/-2;
  grid-column: 1/-1; */
  display: grid;
  grid-auto-flow: column;
`
export const PaperBasedToggleContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`

export const PaperBasedContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
`
