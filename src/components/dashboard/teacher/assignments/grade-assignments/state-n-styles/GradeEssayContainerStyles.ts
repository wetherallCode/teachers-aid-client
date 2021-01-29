import styled from 'styled-components'

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

export const TitleContainer = styled.div`
  display: grid;
`
